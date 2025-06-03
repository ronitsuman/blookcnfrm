import mongoose from 'mongoose';
import Subscription from '../model/Subscription.js';
import Space from '../../space/model/Space.js';
import Booking from '../../Booking/model/booking.js';
import { BadRequestError, UnauthorizedError } from '../../../common/error/index.js';

// Mock Razorpay configuration
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'mock_key_id';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'mock_key_secret';

const createSubscription = async (req, res) => {
  try {
    const { planType, spaceId } = req.body;
    let userId = req.user?.id;

    console.log('createSubscription: userId:', userId, 'planType:', planType, 'spaceId:', spaceId); // Debug

    if (!userId) throw new UnauthorizedError('User not authenticated');
    if (!planType || !['free', 'paid'].includes(planType)) {
      throw new BadRequestError('Invalid plan type');
    }

    if (typeof userId !== 'string' && mongoose.Types.ObjectId.isValid(userId)) {
      userId = userId.toString();
    }

    const plans = {
      free: {
        amount: 0,
        durationMonths: 12,
        features: ['Up to 3 zone listings', 'Standard support', 'Heat Mapping Trial'],
        priorityLevel: 0,
      },
      paid: {
        amount: 1800,
        durationMonths: 12,
        features: [
          'Unlimited zone listings',
          'Featured Badge',
          'Priority Listings',
          'Heat Mapping Trial',
          'Premium support',
        ],
        priorityLevel: 1,
      },
    };

    const { amount, durationMonths, features, priorityLevel } = plans[planType];
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + durationMonths);

    await Subscription.updateMany({ userId, status: 'active' }, { status: 'inactive' });

    const subscription = await Subscription.create({
      userId,
      planType,
      amount,
      startDate: new Date(),
      endDate,
      features,
    });

    // Update space priorityLevel
    if (spaceId && mongoose.Types.ObjectId.isValid(spaceId)) {
      const space = await Space.findOne({ _id: spaceId, owner: userId });
      if (!space) {
        console.warn(`Space not found or not owned: spaceId=${spaceId}, userId=${userId}`); // Debug
        throw new BadRequestError('Space not found or not owned by user');
      }
      await Space.updateOne({ _id: spaceId }, { priorityLevel });
      console.log(`Updated space priorityLevel: spaceId=${spaceId}, priorityLevel=${priorityLevel}`); // Debug
    } else {
      console.log(`No spaceId provided, updating all user spaces: userId=${userId}`); // Debug
      await Space.updateMany({ owner: userId }, { priorityLevel });
    }

    let order = null;
    if (planType === 'paid') {
      // TODO: Replace with actual Razorpay integration when keys are available
      // const razorpay = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
      // const order = await razorpay.orders.create({ amount: amount * 100, currency: 'INR' });
      order = { id: `mock_order_${subscription._id}`, amount, currency: 'INR' };
      subscription.paymentId = order.id;
      await subscription.save();
      console.log(`Mock Razorpay order created: orderId=${order.id}`); // Debug
    }

    res.status(201).json({
      status: 'success',
      message: 'Subscription created',
      data: subscription,
      order,
    });
  } catch (err) {
    console.error(`Error in createSubscription: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

const getSubscriptions = async (req, res) => {
  try {
    let userId = req.user?.id;

    console.log('getSubscriptions: userId:', userId); // Debug

    if (!userId) throw new UnauthorizedError('User not authenticated');

    if (typeof userId !== 'string' && mongoose.Types.ObjectId.isValid(userId)) {
      userId = userId.toString();
    }

    const subscriptions = await Subscription.find({ userId })
      .select('-__v')
      .lean();

    res.status(200).json({
      status: 'success',
      data: subscriptions,
    });
  } catch (err) {
    console.error(`Error in getSubscriptions: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

const createEscrowPayment = async (req, res) => {
  try {
    const { id: bookingId } = req.params;
    let userId = req.user?.id;

    console.log('createEscrowPayment: userId:', userId, 'bookingId:', bookingId); // Debug

    if (!userId) throw new UnauthorizedError('User not authenticated');
    if (!bookingId) throw new BadRequestError('Booking ID is required');

    if (typeof userId !== 'string' && mongoose.Types.ObjectId.isValid(userId)) {
      userId = userId.toString();
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) throw new BadRequestError('Booking not found');
    if (booking.userId.toString() !== userId) {
      throw new BadRequestError('Only booking creator can initiate escrow');
    }
    if (booking.status !== 'confirmed') {
      throw new BadRequestError('Booking must be confirmed for escrow');
    }

    const commission = booking.totalPrice * 0.25;
    const ownerPayout = booking.totalPrice * 0.75;

    // TODO: Replace with actual Razorpay escrow when keys are available
    // const escrow = await razorpay.transfers.create({ amount: booking.totalPrice * 100, currency: 'INR' });
    const escrow = {
      id: `mock_escrow_${bookingId}`,
      amount: booking.totalPrice,
      commission,
      ownerPayout,
      status: 'pending',
    };

    res.status(201).json({
      status: 'success',
      message: 'Escrow payment initiated',
      data: escrow,
    });
  } catch (err) {
    console.error(`Error in createEscrowPayment: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

export { createSubscription, getSubscriptions, createEscrowPayment };