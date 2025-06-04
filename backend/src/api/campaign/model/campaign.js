// // backend/src/api/campaign/models/Campaign.js
// import mongoose from 'mongoose';

// const CampaignSchema = new mongoose.Schema({
//   spaceId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Space',
//     required: [true, 'Space ID is required'],
//   },
//   advertiserId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, 'Advertiser ID is required'],
//   },
//   title: {
//     type: String,
//     required: [true, 'Campaign title is required'],
//     trim: true,
//     minlength: [3, 'Campaign title must be at least 3 characters'],
//     maxlength: [100, 'Campaign title cannot exceed 100 characters'],
//   },
//   description: {
//     type: String,
//     required: [true, 'Campaign description is required'],
//     trim: true,
//   },
//   bannerImage: {
//     type: String,
//     required: [true, 'Banner image is required'],
//   },
//   startDate: {
//     type: Date,
//     required: [true, 'Start date is required'],
//   },
//   endDate: {
//     type: Date,
//     required: [true, 'End date is required'],
//   },
//   totalCost: {
//     type: Number,
//     required: [true, 'Total cost is required'],
//   },
//   status: {
//     type: String,
//     enum: ['active', 'completed', 'cancelled'],
//     default: 'active',
//   },
// }, { timestamps: true });

// export default mongoose.model('Campaign', CampaignSchema);





import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['scratch-card', 'spin-the-wheel', 'feedback-survey', 'instant-coupon', 'loyalty-points'],
  },
  description: {
    type: String,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  media: {
    type: String, // URL to uploaded media
    trim: true,
  },
  qrCode: {
    type: String,
    unique: true,
    required: true,
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Scheduled', 'Inactive'],
    default: 'Scheduled',
  },
  scans: {
    type: Number,
    default: 0,
  },
  engagementRate: {
    type: Number,
    default: 0,
  },
  redemptionRate: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // revenue:{
  //   type: Number,
  //   default: 0,
  // }
});

campaignSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  if (this.startDate <= Date.now() && this.endDate >= Date.now()) {
    this.status = 'Active';
  } else if (this.endDate < Date.now()) {
    this.status = 'Inactive';
  }
  next();
});

export default mongoose.model('Campaign', campaignSchema);