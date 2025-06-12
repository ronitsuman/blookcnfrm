import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  spaceName: { type: String, required: true },
  amount: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  commissionRate: { type: Number, default: 10 }, // percentage
  commissionEarned: { type: Number },
  spaceDetails: {
    address: String,
    photos: [String],
    category: String,
    city: String
  }
}, { timestamps: true });

subscriptionSchema.pre('save', function (next) {
  this.commissionEarned = (this.amount * this.commissionRate) / 100;
  next();
});

export default mongoose.model('Subscription', subscriptionSchema);