import Subscription from '../models/Subscription.js';
import mongoose from 'mongoose';

export const getMyCommissions = async (req, res) => {
  try {
    const commissions = await Subscription.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(req.user.id) }
      },
      {
        $group: {
          _id: {
            month: { $month: '$bookingDate' },
            year: { $year: '$bookingDate' }
          },
          totalCommission: { $sum: '$commissionEarned' },
          totalBookings: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1 }
      }
    ]);

    res.status(200).json(commissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};