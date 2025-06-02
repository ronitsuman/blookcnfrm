import mongoose from 'mongoose';

const AvailabilitySchema = new mongoose.Schema({
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
    required: [true, 'Space ID is required'],
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
    enum: ['available', 'booked', 'unavailable'],
    default: 'available',
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative'],
  },
}, {
  timestamps: true,
});

AvailabilitySchema.index({ spaceId: 1, startDate: 1, endDate: 1 });

export default mongoose.model('Availability', AvailabilitySchema);