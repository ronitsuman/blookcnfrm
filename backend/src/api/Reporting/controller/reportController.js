// src/controllers/reportController.js
import Visit from '../models/Visit.js';
import Commission from '../models/Commission.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export const getReports = async (req, res) => {
  try {
    const { type = 'monthly', city, agentId } = req.query;

    const matchStage = {};
    if (agentId) matchStage.user = new mongoose.Types.ObjectId(agentId);
    if (city) matchStage.city = city; // Assuming city is stored in visits or user profile

    const groupByFormat = {
      daily: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      weekly: { $isoWeek: "$createdAt" },
      monthly: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
      quarterly: {
        $concat: [
          { $toString: { $year: "$createdAt" } },
          "-Q",
          { $toString: { $ceil: { $divide: [{ $month: "$createdAt" }, 3] } } }
        ]
      }
    };

    const data = await Visit.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: groupByFormat[type] || groupByFormat.monthly,
          totalVisits: { $sum: 1 },
          hotLeads: {
            $sum: {
              $cond: [{ $eq: ["$outcome", "hot"] }, 1, 0]
            }
          },
          warmLeads: {
            $sum: {
              $cond: [{ $eq: ["$outcome", "warm"] }, 1, 0]
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};