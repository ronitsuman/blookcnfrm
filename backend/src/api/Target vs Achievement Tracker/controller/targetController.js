import Target from '../models/Target.js';
import Subscription from '../models/Subscription.js';
import mongoose from 'mongoose';

// Admin: Set or update target
export const setTarget = async (req, res) => {
  const { userId, month, year, targetAmount } = req.body;
  try {
    const existing = await Target.findOne({ user: userId, month, year });

    if (existing) {
      existing.targetAmount = targetAmount;
      await existing.save();
      return res.status(200).json(existing);
    }

    const target = await Target.create({ user: userId, month, year, targetAmount });
    res.status(201).json(target);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Agent: Get progress
export const getMyTargetProgress = async (req, res) => {
  try {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const target = await Target.findOne({
      user: req.user.id,
      month,
      year
    });

    const result = await Subscription.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          $expr: {
            $and: [
              { $eq: [{ $month: '$bookingDate' }, month] },
              { $eq: [{ $year: '$bookingDate' }, year] }
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalEarned: { $sum: '$commissionEarned' }
        }
      }
    ]);

    const earned = result.length ? result[0].totalEarned : 0;
    const targetAmount = target ? target.targetAmount : 0;
    const percent = targetAmount ? Math.min(100, Math.round((earned / targetAmount) * 100)) : 0;

    res.status(200).json({ targetAmount, earned, percent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};