import mongoose from 'mongoose';
import Booking from '../../Booking/model/booking.js';
import Space from '../../space/model/Space.js';
import { BadRequestError, UnauthorizedError, ForbiddenError } from '../../../common/error/index.js';

const getBookingAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let userId = req.user?.id;
    const userRole = req.user?.role;

    console.log('getBookingAnalytics: userId (raw):', userId, 'role:', userRole, 'startDate:', startDate, 'endDate:', endDate); // Debug

    if (!userId) throw new UnauthorizedError('User not authenticated');

    // Normalize userId to string if it's an ObjectId
    if (typeof userId !== 'string' && userId instanceof mongoose.Types.ObjectId) {
      userId = userId.toString();
    }
    console.log('Normalized userId:', userId); // Debug

    // Validate date range
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();
    if (isNaN(start) || isNaN(end)) throw new BadRequestError('Invalid date range');

    let matchQuery = {
      createdAt: { $gte: start, $lte: end },
    };

    // Restrict data based on role
    if (userRole === 'brand') {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new BadRequestError('Invalid user ID');
      }
      matchQuery.userId = new mongoose.Types.ObjectId(userId);
    } else if (userRole === 'space_owner') {
      const spaces = await Space.find({ owner: userId }).select('_id');
      matchQuery.spaceId = { $in: spaces.map(s => s._id) };
    } else if (userRole !== 'admin') {
      throw new ForbiddenError('Unauthorized access');
    }

    const analytics = await Booking.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
      {
        $project: {
          status: '$_id',
          count: 1,
          totalRevenue: 1,
          _id: 0,
        },
      },
    ]);

    console.log('Booking analytics:', analytics); // Debug

    res.status(200).json({
      status: 'success',
      data: analytics,
    });
  } catch (err) {
    console.error(`Error in getBookingAnalytics: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

const getFootfallAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let userId = req.user?.id;
    const userRole = req.user?.role;

    console.log('getFootfallAnalytics: userId (raw):', userId, 'role:', userRole, 'startDate:', startDate, 'endDate:', endDate); // Debug

    if (!userId) throw new UnauthorizedError('User not authenticated');

    // Normalize userId to string if it's an ObjectId
    if (typeof userId !== 'string' && userId instanceof mongoose.Types.ObjectId) {
      userId = userId.toString();
    }
    console.log('Normalized userId:', userId); // Debug

    // Validate date range
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();
    if (isNaN(start) || isNaN(end)) throw new BadRequestError('Invalid date range');

    let matchQuery = {};

    // Restrict data based on role
    if (userRole === 'space_owner') {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new BadRequestError('Invalid user ID');
      }
      matchQuery.owner = new mongoose.Types.ObjectId(userId);
    } else if (userRole !== 'admin') {
      throw new ForbiddenError('Unauthorized access');
    }

    const analytics = await Space.aggregate([
      { $match: matchQuery },
      {
        $project: {
          spaceId: '$_id',
          name: 1,
          weekdayFootfall: 1,
          weekendFootfall: 1,
        },
      },
    ]);

    console.log('Footfall analytics:', analytics); // Debug

    res.status(200).json({
      status: 'success',
      data: analytics,
    });
  } catch (err) {
    console.error(`Error in getFootfallAnalytics: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

export { getBookingAnalytics, getFootfallAnalytics };