// src/api/user/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'],
  },
  role: {
    type: String,
    enum: ['space_owner', 'brand', 'vendor', 'blookforce_agent', 'telecaller', 'admin'],
    required: [true, 'Role is required'],
  },
  city: {
    type: String,
    required: false,
    trim: true,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  pincode: {
    type: String,
    required: false,
    trim: true,
    match: [/^\d{6}$/, 'Invalid pincode'],
  },
  occupation: {
    type: String,
    required: false,
    trim: true,
  },
  workingHours: {
    type: String,
    required: false,
    trim: true,
  },
  blookforceCode: {
    type: String,
    unique: true,
    sparse: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
    },
  },
  profilePhoto: {
    type: String,
    default: null,
  },
  bankDetails: {
    accountNumber: {
      type: String,
      trim: true,
      required: [
        function () {
          return ['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(this.role) && this.bankDetails && Object.keys(this.bankDetails).length > 0;
        },
        'Bank account number is required',
      ],
      validate: {
        validator: function (value) {
          if (['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(this.role) && this.bankDetails && Object.keys(this.bankDetails).length > 0) {
            return value && value.trim().length > 0;
          }
          return true;
        },
        message: 'Bank account number cannot be empty',
      },
    },
    ifscCode: {
      type: String,
      trim: true,
      required: [
        function () {
          return ['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(this.role) && this.bankDetails && Object.keys(this.bankDetails).length > 0;
        },
        'IFSC code is required',
      ],
      validate: {
        validator: function (value) {
          if (['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(this.role) && this.bankDetails && Object.keys(this.bankDetails).length > 0) {
            return value && value.trim().length > 0;
          }
          return true;
        },
        message: 'IFSC code cannot be empty',
      },
    },
    bankName: {
      type: String,
      trim: true,
      required: [
        function () {
          return ['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(this.role) && this.bankDetails && Object.keys(this.bankDetails).length > 0;
        },
        'Bank name is required',
      ],
      validate: {
        validator: function (value) {
          if (['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(this.role) && this.bankDetails && Object.keys(this.bankDetails).length > 0) {
            return value && value.trim().length > 0;
          }
          return true;
        },
        message: 'Bank name cannot be empty',
      },
    },
    accountHolderName: {
      type: String,
      trim: true,
      required: [
        function () {
          return ['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(this.role) && this.bankDetails && Object.keys(this.bankDetails).length > 0;
        },
        'Account holder name is required',
      ],
      validate: {
        validator: function (value) {
          if (['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(this.role) && this.bankDetails && Object.keys(this.bankDetails).length > 0) {
            return value && value.trim().length > 0;
          }
          return true;
        },
        message: 'Account holder name cannot be empty',
      },
    },
  },
  complianceDocs: {
    gstNumber: {
      type: String,
      required: false,
      trim: true,
    },
    panNumber: {
      type: String,
      required: false,
      trim: true,
    },
    idProof: {
      type: String,
      required: function () {
        return this.role === 'blookforce_agent';
      },
    },
  },
  referredBy: {
    type: String,
    default: null,
  },
  companyName: {
    type: String,
    trim: true,
  },
  onboardingTarget: {
    type: Number,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  resetPasswordOTP: String,
  resetPasswordOTPExpiry: Date,
  resetToken: String,
  spaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Space',
      default: [], // Ensure spaces is always an array
    },
  ],
  spaceCount: {
    type: Number,
    default: 0, // Ensure spaceCount is always a number
  },
  avgRating: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationOTP: String,
  verificationOTPExpiry: Date,
  
}, {
  timestamps: true,
});

userSchema.index({ location: '2dsphere' });

userSchema.pre('save', function (next) {
  const age = (new Date() - new Date(this.dateOfBirth)) / (1000 * 60 * 60 * 24 * 365);
  if (age < 18) {
    throw new Error('User must be at least 18 years old');
  }
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to clear OTP fields after successful reset
userSchema.methods.clearResetOTP = async function () {
  this.resetPasswordOTP = undefined;
  this.resetPasswordOTPExpiry = undefined;
  await this.save();
};

export default mongoose.model('User', userSchema);