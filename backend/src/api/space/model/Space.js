// src/api/space/models/Space.js
import mongoose from 'mongoose';

const SpaceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Space owner is required'],
  },
  name: {
    type: String,
    required: [true, 'Space name is required'],
    trim: true,
    minlength: [3, 'Space name must be at least 3 characters'],
    maxlength: [100, 'Space name cannot exceed 100 characters'],
  },
  type: {
    type: String,
    required: [true, 'Space type is required'],
    enum: ['RWA', 'Mall', 'Retail', 'Cafe', 'store', 'salon', 'gym', 'other'], // Merged enum values
  },
  managerName: {
    type: String,
    required: [true, 'Manager name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'],
  },
  email: {
    type: String,
    required: false,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    trim: true,
    match: [/^\d{6}$/, 'Invalid pincode'],
  },
  landmark: {
    type: String,
    required: false,
    trim: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: false,
    },
  },
  weekdayFootfall: {
    type: Number,
    required: false,
  },
  weekendFootfall: {
    type: Number,
    required: false,
  },
  brandingAreaSize: {
    type: String,
    required: false,
    trim: true,
  },
  hasCCTV: {
    type: String,
    enum: ['yes', 'no'],
    required: false,
  },
  cameraCount: {
    type: Number,
    required: function () {
      return this.hasCCTV === 'yes';
    },
  },
  cameraAligned: {
    type: String,
    enum: ['yes', 'no', 'unsure'],
    required: function () {
      return this.hasCCTV === 'yes';
    },
  },
  complianceDetails: {
    panNumber: { type: String, required: false, trim: true },
    gstNumber: { type: String, required: false, trim: true },
  },
  heatMapping: {
    type: String,
    enum: ['yes', 'no'],
    required: false,
  },
  listingType: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free',
  },
  preferredTiming: {
    type: String,
    required: false,
    trim: true,
  },
  photos: [
    {
      type: String, // Cloudinary URLs for space photos
    },
  ],
  photoTimestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
}, {
  timestamps: true,
});

SpaceSchema.index({ location: '2dsphere' });

export default mongoose.model('Space', SpaceSchema);