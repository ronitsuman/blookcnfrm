// backend/src/api/campaign/models/Campaign.js
import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
    required: [true, 'Space ID is required'],
  },
  advertiserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Advertiser ID is required'],
  },
  title: {
    type: String,
    required: [true, 'Campaign title is required'],
    trim: true,
    minlength: [3, 'Campaign title must be at least 3 characters'],
    maxlength: [100, 'Campaign title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Campaign description is required'],
    trim: true,
  },
  bannerImage: {
    type: String,
    required: [true, 'Banner image is required'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
  },
  totalCost: {
    type: Number,
    required: [true, 'Total cost is required'],
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active',
  },
}, { timestamps: true });

export default mongoose.model('Campaign', CampaignSchema);