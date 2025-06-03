import Booking from '../model/booking.js';
import Space from '../../space/model/Space.js';
import Availability from '../../calender/model/availablitymodel.js';
import { BadRequestError, UnauthorizedError, ForbiddenError } from '../../../common/error/index.js';
import mongoose from 'mongoose';

// Placeholder for Razorpay (add keys later)
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'your_key_id';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'your_key_secret';

// const createBooking = async (req, res) => {
//   try {
//     const { spaceId, startDate, endDate, totalPrice } = req.body;
//     const userId = req.user?.id;

//     if (!userId) throw new UnauthorizedError('User not authenticated');
//     if (!spaceId || !startDate || !endDate || !totalPrice) {
//       throw new BadRequestError('Space ID, start date, end date, and total price are required');
//     }

//     const space = await Space.findById(spaceId);
//     if (!space) throw new BadRequestError('Space not found');

//     // Validate availability
//     const availableSlot = await Availability.findOne({
//       spaceId,
//       startDate: { $lte: new Date(startDate) },
//       endDate: { $gte: new Date(endDate) },
//       status: 'available',
//     });

//     if (!availableSlot) throw new BadRequestError('No available slot for selected dates');

//     // Check for overlapping bookings
//     const existingBooking = await Booking.findOne({
//       spaceId,
//       status: { $in: ['pending', 'confirmed'] },
//       $or: [
//         { startDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
//         { endDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
//         { startDate: { $lte: new Date(startDate) }, endDate: { $gte: new Date(endDate) } },
//       ],
//     });

//     if (existingBooking) throw new BadRequestError('Selected slot is already booked');

//     const booking = await Booking.create({
//       spaceId,
//       userId,
//       startDate: new Date(startDate),
//       endDate: new Date(endDate),
//       totalPrice,
//     });

//     // TODO: Integrate Razorpay order creation
//     // const order = await createRazorpayOrder(booking._id, totalPrice);
//     // booking.paymentId = order.id;
//     // await booking.save();

//     res.status(201).json({
//       status: 'success',
//       message: 'Booking created, proceed to payment',
//       data: booking,
//       // order, // Uncomment when Razorpay integrated
//     });
//   } catch (err) {
//     console.error(`Error in createBooking: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

const createBooking = async (req, res) => {
  try {
    const { spaceId, startDate, endDate, totalPrice } = req.body;
    const userId = req.user?.id;

    if (!userId) throw new UnauthorizedError('User not authenticated');
    if (!spaceId || !startDate || !endDate || !totalPrice) {
      throw new BadRequestError('Space ID, start date, end date, and total price are required');
    }

    const space = await Space.findById(spaceId);
    if (!space) throw new BadRequestError('Space not found');

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) throw new BadRequestError('End date must be after start date');

    // Check for overlapping bookings
    const existingBooking = await Booking.findOne({
      spaceId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { startDate: { $lte: end, $gte: start } },
        { endDate: { $lte: end, $gte: start } },
        { startDate: { $lte: start }, endDate: { $gte: end } },
      ],
    });

    if (existingBooking) throw new BadRequestError('Selected slot is already booked');

    // Check for existing availability slot
    let availableSlot = await Availability.findOne({
      spaceId,
      startDate: { $lte: start },
      endDate: { $gte: end },
      status: 'available',
    });

    // If no slot exists, create a new one
    if (!availableSlot) {
      availableSlot = await Availability.create({
        spaceId,
        startDate: start,
        endDate: end,
        status: 'available',
      });

      // Update Space.availability
      space.availability.push(availableSlot._id);
      await space.save();
    }

    const booking = await Booking.create({
      spaceId,
      userId,
      startDate: start,
      endDate: end,
      totalPrice,
    });

    // TODO: Integrate Razorpay order creation
    // const order = await createRazorpayOrder(booking._id, totalPrice);
    // booking.paymentId = order.id;
    // await booking.save();

    res.status(201).json({
      status: 'success',
      message: 'Booking created, proceed to payment',
      data: booking,
      // order, // Uncomment when Razorpay integrated
    });
  } catch (err) {
    console.error(`Error in createBooking: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedError('User not authenticated');

    const bookings = await Booking.find({ userId })
      .populate('spaceId', 'name city')
      .lean();

    res.status(200).json({
      status: 'success',
      data: bookings,
    });
  } catch (err) {
    console.error(`Error in getUserBookings: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

// const getSpaceBookings = async (req, res) => {
//   try {
//     const { spaceId } = req.params;
//     const userId = req.user?.id;

//     if (!userId) throw new UnauthorizedError('User not authenticated');
//     if (!spaceId) throw new BadRequestError('Space ID is required');

//     const space = await Space.findById(spaceId);
//     if (!space) throw new BadRequestError('Space not found');
//     if (space.owner.toString() !== userId) {
//       throw new ForbiddenError('Only space owner can view bookings');
//     }

//     const bookings = await Booking.find({ spaceId })
//       .populate('userId', 'name email')
//       .lean();

//     res.status(200).json({
//       status: 'success',
//       data: bookings,
//     });
//   } catch (err) {
//     console.error(`Error in getSpaceBookings: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

// const getSpaceBookings = async (req, res) => {
//   try {
//     const { spaceId } = req.params;
//     const userId = req.user?.id;

//     console.log('getSpaceBookings: spaceId:', spaceId, 'userId:', userId); // Debug

//     if (!userId) throw new UnauthorizedError('User not authenticated');
//     if (!spaceId) throw new BadRequestError('Space ID is required');

//     const space = await Space.findById(spaceId);
//     if (!space) throw new BadRequestError('Space not found');

//     console.log('Space document:', space); // Debug
//     if (!space.owner) throw new BadRequestError('Space has no assigned owner');
//     if (space.owner.toString() !== userId) {
//       throw new ForbiddenError('Only space owner can view bookings');
//     }

//     const bookings = await Booking.find({ spaceId })
//       .populate('userId', 'name email')
//       .lean();

//     console.log('Fetched bookings:', bookings); // Debug

//     res.status(200).json({
//       status: 'success',
//       data: bookings,
//     });
//   } catch (err) {
//     console.error(`Error in getSpaceBookings: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

const getSpaceBookings = async (req, res) => {
  try {
    const { spaceId } = req.params;
    let userId = req.user?.id;

    console.log('getSpaceBookings: spaceId:', spaceId, 'userId (raw):', userId); // Debug
    console.log('Request headers:', req.headers); // Debug token

    if (!userId) throw new UnauthorizedError('User not authenticated');
    if (!spaceId) throw new BadRequestError('Space ID is required');

    // Normalize userId to string if it's an ObjectId
    if (mongoose.Types.ObjectId.isValid(userId)) {
      userId = userId.toString();
    }
    console.log('Normalized userId:', userId); // Debug

    const space = await Space.findById(spaceId);
    if (!space) throw new BadRequestError('Space not found');

    console.log('Space document:', space); // Debug
    if (!space.owner) {
      console.error('Space has no owner assigned:', spaceId);
      throw new BadRequestError('Space has no assigned owner');
    }

    if (space.owner.toString() !== userId) {
      console.log('Owner mismatch: space.owner:', space.owner.toString(), 'userId:', userId);
      throw new ForbiddenError('Only space owner can view bookings');
    }

    const bookings = await Booking.find({ spaceId })
      .populate('userId', 'name email')
      .lean();

    console.log('Fetched bookings:', bookings); // Debug

    res.status(200).json({
      status: 'success',
      data: bookings,
    });
  } catch (err) {
    console.error(`Error in getSpaceBookings: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};
// const updateBookingStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
//     const userId = req.user?.id;

//     if (!userId) throw new UnauthorizedError('User not authenticated');
//     if (!id || !status) throw new BadRequestError('Booking ID and status are required');
//     if (!['confirmed', 'rejected'].includes(status)) {
//       throw new BadRequestError('Invalid status');
//     }

//     const booking = await Booking.findById(id);
//     if (!booking) throw new BadRequestError('Booking not found');

//     const space = await Space.findById(booking.spaceId);
//     if (!space || space.owner.toString() !== userId) {
//       throw new ForbiddenError('Only space owner can update booking status');
//     }

//     if (booking.status !== 'pending') {
//       throw new BadRequestError('Booking is already processed');
//     }

//     booking.status = status;
//     if (status === 'confirmed') {
//       // Update availability status
//       await Availability.updateOne(
//         {
//           spaceId: booking.spaceId,
//           startDate: { $lte: booking.startDate },
//           endDate: { $gte: booking.endDate },
//           status: 'available',
//         },
//         { status: 'booked' }
//       );
//       booking.paymentStatus = 'completed'; // Assume payment done
//     }
//     await booking.save();

//     res.status(200).json({
//       status: 'success',
//       message: `Booking ${status}`,
//       data: booking,
//     });
//   } catch (err) {
//     console.error(`Error in updateBookingStatus: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };


const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    let userId = req.user?.id;

    console.log('updateBookingStatus: bookingId:', id, 'userId (raw):', userId, 'status:', status); // Debug
    console.log('Request headers:', req.headers); // Debug token

    if (!userId) throw new UnauthorizedError('User not authenticated');
    if (!id || !status) throw new BadRequestError('Booking ID and status are required');
    if (!['confirmed', 'rejected'].includes(status)) {
      throw new BadRequestError('Invalid status');
    }

    // Normalize userId to string
    if (mongoose.Types.ObjectId.isValid(userId)) {
      userId = userId.toString();
    }
    console.log('Normalized userId:', userId); // Debug

    const booking = await Booking.findById(id);
    if (!booking) throw new BadRequestError('Booking not found');

    const space = await Space.findById(booking.spaceId);
    if (!space) throw new BadRequestError('Space not found');

    console.log('Space document:', space); // Debug
    if (!space.owner) {
      console.error('Space has no owner assigned:', booking.spaceId);
      throw new BadRequestError('Space has no assigned owner');
    }

    // Allow admin or space owner
    if (req.user.role !== 'admin' && space.owner.toString() !== userId) {
      console.log('Owner mismatch: space.owner:', space.owner.toString(), 'userId:', userId, 'userRole:', req.user.role);
      throw new ForbiddenError('Only space owner or admin can update booking status');
    }

    if (booking.status !== 'pending') {
      throw new BadRequestError('Booking is already processed');
    }

    booking.status = status;
    if (status === 'confirmed') {
      // Update availability status
      await Availability.updateOne(
        {
          spaceId: booking.spaceId,
          startDate: { $lte: booking.startDate },
          endDate: { $gte: booking.endDate },
          status: 'available',
        },
        { status: 'booked' }
      );
      booking.paymentStatus = 'completed'; // Assume payment done
    }
    await booking.save();

    res.status(200).json({
      status: 'success',
      message: `Booking ${status}`,
      data: booking,
    });
  } catch (err) {
    console.error(`Error in updateBookingStatus: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};


// const cancelBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user?.id;

//     if (!userId) throw new UnauthorizedError('User not authenticated');
//     if (!id) throw new BadRequestError('Booking ID is required');

//     const booking = await Booking.findById(id);
//     if (!booking) throw new BadRequestError('Booking not found');
//     if (booking.userId.toString() !== userId) {
//       throw new ForbiddenError('Only booking creator can cancel');
//     }

//     if (booking.status !== 'pending') {
//       throw new BadRequestError('Only pending bookings can be cancelled');
//     }

//     booking.status = 'cancelled';
//     await booking.save();

//     res.status(200).json({
//       status: 'success',
//       message: 'Booking cancelled',
//     });
//   } catch (err) {
//     console.error(`Error in cancelBooking: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

// Placeholder Razorpay functions


const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    let userId = req.user?.id;

    console.log('cancelBooking: bookingId:', id, 'userId (raw):', userId); // Debug
    console.log('Request headers:', req.headers); // Debug token

    if (!userId) throw new UnauthorizedError('User not authenticated');
    if (!id) throw new BadRequestError('Booking ID is required');

    // Normalize userId to string
    if (mongoose.Types.ObjectId.isValid(userId)) {
      userId = userId.toString();
    }
    console.log('Normalized userId:', userId); // Debug

    const booking = await Booking.findById(id);
    if (!booking) throw new BadRequestError('Booking not found');

    console.log('Booking document:', booking); // Debug
    if (booking.userId.toString() !== userId) {
      console.log('Creator mismatch: booking.userId:', booking.userId.toString(), 'userId:', userId);
      throw new ForbiddenError('Only booking creator can cancel');
    }

    if (booking.status !== 'pending') {
      throw new BadRequestError('Only pending bookings can be cancelled');
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      status: 'success',
      message: 'Booking cancelled',
    });
  } catch (err) {
    console.error(`Error in cancelBooking: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

const createRazorpayOrder = async (bookingId, amount) => {
  // TODO: Add Razorpay integration
  // const Razorpay = require('razorpay');
  // const instance = new Razorpay({
  //   key_id: RAZORPAY_KEY_ID,
  //   key_secret: RAZORPAY_KEY_SECRET,
  // });
  // const options = {
  //   amount: amount * 100, // in paise
  //   currency: 'INR',
  //   receipt: `booking_${bookingId}`,
  // };
  // return await instance.orders.create(options);
  return { id: `mock_order_${bookingId}`, amount, currency: 'INR' }; // Mock response
};

const verifyRazorpayPayment = async (req, res) => {
  try {
    const { bookingId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // TODO: Add Razorpay verification
    // const crypto = require('crypto');
    // const generated_signature = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET)
    //   .update(razorpay_order_id + '|' + razorpay_payment_id)
    //   .digest('hex');
    // if (generated_signature !== razorpay_signature) {
    //   throw new BadRequestError('Invalid payment signature');
    // }

    const booking = await Booking.findById(bookingId);
    if (!booking) throw new BadRequestError('Booking not found');

    booking.paymentId = razorpay_payment_id;
    booking.paymentStatus = 'completed';
    booking.status = 'confirmed';
    await booking.save();

    // Update availability
    await Availability.updateOne(
      {
        spaceId: booking.spaceId,
        startDate: { $lte: booking.startDate },
        endDate: { $gte: booking.endDate },
        status: 'available',
      },
      { status: 'booked' }
    );

    res.status(200).json({
      status: 'success',
      message: 'Payment verified',
      data: booking,
    });
  } catch (err) {
    console.error(`Error in verifyRazorpayPayment: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

export { createBooking, getUserBookings, getSpaceBookings, updateBookingStatus, cancelBooking, verifyRazorpayPayment };