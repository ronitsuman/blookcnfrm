import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
    required: [true, 'Space ID is required'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date',
    },
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected', 'cancelled'],
    default: 'pending',
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative'],
  },
  paymentId: {
    type: String, // Razorpay payment ID
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

BookingSchema.index({ spaceId: 1, userId: 1, startDate: 1 });

export default mongoose.model('Booking', BookingSchema);