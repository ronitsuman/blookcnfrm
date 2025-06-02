// // src/api/space/models/Space.js
// import mongoose from 'mongoose';

// const SpaceSchema = new mongoose.Schema({
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, 'Space owner is required'],
//   },
//   name: {
//     type: String,
//     required: [true, 'Space name is required'],
//     trim: true,
//     minlength: [3, 'Space name must be at least 3 characters'],
//     maxlength: [100, 'Space name cannot exceed 100 characters'],
//   },
//   type: {
//     type: String,
//     required: [true, 'Space type is required'],
//     enum: ['RWA', 'Mall', 'Retail', 'Cafe', 'store', 'salon', 'gym', 'other'], // Merged enum values
//   },
//   managerName: {
//     type: String,
//     required: [true, 'Manager name is required'],
//     trim: true,
//   },
//   phone: {
//     type: String,
//     required: [true, 'Phone number is required'],
//     trim: true,
//     match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'],
//   },
//   email: {
//     type: String,
//     required: false,
//     trim: true,
//     match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
//   },
//   address: {
//     type: String,
//     required: [true, 'Address is required'],
//     trim: true,
//   },
//   city: {
//     type: String,
//     required: [true, 'City is required'],
//     trim: true,
//   },
//   pincode: {
//     type: String,
//     required: [true, 'Pincode is required'],
//     trim: true,
//     match: [/^\d{6}$/, 'Invalid pincode'],
//   },
//   landmark: {
//     type: String,
//     required: false,
//     trim: true,
//   },
//   location: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       default: 'Point',
//     },
//     coordinates: {
//       type: [Number], // [longitude, latitude]
//       required: false,
//     },
//   },
//   weekdayFootfall: {
//     type: Number,
//     required: false,
//   },
//   weekendFootfall: {
//     type: Number,
//     required: false,
//   },
//   brandingAreaSize: {
//     type: String,
//     required: false,
//     trim: true,
//   },
//   hasCCTV: {
//     type: String,
//     enum: ['yes', 'no'],
//     required: false,
//   },
//   cameraCount: {
//     type: Number,
//     required: function () {
//       return this.hasCCTV === 'yes';
//     },
//   },
//   cameraAligned: {
//     type: String,
//     enum: ['yes', 'no', 'unsure'],
//     required: function () {
//       return this.hasCCTV === 'yes';
//     },
//   },
//   complianceDetails: {
//     panNumber: { type: String, required: false, trim: true },
//     gstNumber: { type: String, required: false, trim: true },
//   },
//   heatMapping: {
//     type: String,
//     enum: ['yes', 'no'],
//     required: false,
//   },
//   listingType: {
//     type: String,
//     enum: ['free', 'premium'],
//     default: 'free',
//   },
//   preferredTiming: {
//     type: String,
//     required: false,
//     trim: true,
//   },
//   photos: [
//     {
//       type: String, // Cloudinary URLs for space photos
//     },
//   ],
//   photoTimestamp: {
//     type: Date,
//     default: Date.now,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'approved', 'rejected'],
//     default: 'pending',
//   },
//   price: {
//     type: Number,
//     required: [true, 'Price is required'],
//   },
//   agentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: false,
//   },
// }, {
//   timestamps: true,
// });

// SpaceSchema.index({ location: '2dsphere' });

// export default mongoose.model('Space', SpaceSchema);


//part 2 final
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
    enum: ['RWA', 'Mall', 'Retail', 'Cafe', 'store', 'salon', 'gym', 'other'],
  },
  managerName: {
    type: String,
    required: [true, 'Manager name is required'],
    trim: true,
    minlength: [2, 'Manager name must be at least 2 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'],
  },
  email: {
    type: String,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    minlength: [5, 'Address must be at least 5 characters'],
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
    trim: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: [true, 'Location coordinates are required'],
      validate: {
        validator: function (coords) {
          return coords.length === 2 && coords.every(c => typeof c === 'number' && !isNaN(c));
        },
        message: 'Invalid coordinates',
      },
    },
  },
  weekdayFootfall: {
    type: Number,
    min: [0, 'Footfall cannot be negative'],
  },
  weekendFootfall: {
    type: Number,
    min: [0, 'Footfall cannot be negative'],
  },
  brandingAreaSize: {
    type: String,
    trim: true,
  },
  hasCCTV: {
    type: String,
    enum: ['yes', 'no', ''],
    default: '',
  },
  cameraCount: {
    type: Number,
    min: [0, 'Camera count cannot be negative'],
    required: function () {
      return this.hasCCTV === 'yes';
    },
  },
  cameraAligned: {
    type: String,
    enum: ['yes', 'no', 'unsure', ''],
    required: function () {
      return this.hasCCTV === 'yes';
    },
  },
  complianceDetails: {
    panNumber: { type: String, trim: true },
    gstNumber: { type: String, trim: true },
  },
  heatMapping: {
    type: String,
    enum: ['yes', 'no', ''],
    default: '',
  },
  listingType: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free',
  },
  preferredTiming: {
    type: String,
    trim: true,
  },
  photos: [
    {
      type: String,
      required: [true, 'At least one photo is required'],
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
    min: [0, 'Price cannot be negative'],
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  ageGroupMix: {
    type: String,
    trim: true,
  },
  availability: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Availability',
    },
  ],
}, {
  timestamps: true,
});

SpaceSchema.index({ location: '2dsphere' });

export default mongoose.model('Space', SpaceSchema);