// src/api/auth/controllers/authController.js
import jwt from 'jsonwebtoken';
import User from '../../user/models/User.js';
import { sendEmail } from '../../../integrations/email/email.service.js';
import { BadRequestError, UnauthorizedError } from '../../../common/error/index.js';
import generateToken from '../../user/helper/generateToken.js';
import generateOTP from '../../user/helper/generateOtp.js';




// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      throw new BadRequestError('Email and password are required');
    }

    // Find user by email and select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return user details (excluding password) and token
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (err) {
    console.error(`Error in login: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

// Forgot password controller
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      throw new BadRequestError('Email is required');
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('User not found');
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Save OTP and expiry to user
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiry = otpExpiry;
    await user.save();

    // Send OTP via email
    try {
      await sendEmail({
        to: email,
        subject: 'Password Reset OTP - BLookMySpace',
        text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
      });
    } catch (emailErr) {
      console.error(`Failed to send OTP email to ${email}: ${emailErr.message}`);
      throw new BadRequestError('Failed to send OTP. Please try again.');
    }

    res.status(200).json({
      status: 'success',
      message: 'OTP sent to your email!',
    });
  } catch (err) {
    console.error(`Error in forgotPassword: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

// Reset password controller
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate inputs
    if (!email || !otp || !newPassword) {
      throw new BadRequestError('Email, OTP, and new password are required');
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('User not found');
    }

    // Verify OTP and expiry
    if (user.resetPasswordOTP !== otp || user.resetPasswordOTPExpiry < Date.now()) {
      throw new BadRequestError('Invalid or expired OTP');
    }

    // Update password
    user.password = newPassword; // Will be hashed by pre-save hook
    await user.clearResetOTP(); // Clear OTP fields

    res.status(200).json({
      status: 'success',
      message: 'Password reset successfully!',
    });
  } catch (err) {
    console.error(`Error in resetPassword: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

export { login, forgotPassword, resetPassword };