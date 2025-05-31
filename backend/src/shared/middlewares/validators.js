// src/middlewares/validators.js
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../../common/error/index.js';

// Existing validateUser
const validateUser = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('phone').matches(/^\+?[1-9]\d{1,14}$/).withMessage('Please provide a valid phone number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['space_owner', 'brand', 'vendor', 'blookforce_agent', 'telecaller', 'admin']).withMessage('Invalid user role'),
  body('dateOfBirth').isISO8601().toDate().withMessage('Invalid date of birth (use YYYY-MM-DD)'),
  body('city').optional().trim(),
  body('address').optional().trim(),
  body('pincode').optional().matches(/^\d{6}$/).withMessage('Invalid pincode'),
  body('occupation').optional().trim(),
  body('workingHours').optional().trim(),
  body('onboardingTarget').optional().isInt({ min: 0 }).withMessage('Invalid onboarding target'),
  body('complianceDocs.gstNumber').optional().trim(),
  body('complianceDocs.panNumber').optional().trim(),
  body('referredBy').optional().trim(),
  body('companyName').optional().trim(),
  // Require bank details for payment-related roles
  body('bankDetails.accountNumber')
    .if(body('role').isIn(['blookforce_agent', 'telecaller', 'vendor']))
    .trim()
    .notEmpty()
    .withMessage('Bank account number is required for this role'),
  body('bankDetails.ifscCode')
    .if(body('role').isIn(['blookforce_agent', 'telecaller', 'vendor']))
    .trim()
    .notEmpty()
    .withMessage('IFSC code is required for this role'),
  body('bankDetails.bankName')
    .if(body('role').isIn(['blookforce_agent', 'telecaller', 'vendor']))
    .trim()
    .notEmpty()
    .withMessage('Bank name is required for this role'),
  body('bankDetails.accountHolderName')
    .if(body('role').isIn(['blookforce_agent', 'telecaller', 'vendor']))
    .trim()
    .notEmpty()
    .withMessage('Account holder name is required for this role'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError(errors.array().map(err => err.msg).join(', '));
    }
    next();
  },
];

// Existing validateSpace (unchanged)
const validateSpace = [
  body('title').trim().notEmpty().withMessage('Space title is required'),
  body('description').trim().notEmpty().withMessage('Space description is required'),
  body('address').trim().notEmpty().withMessage('Space address is required'),
  body('city').trim().notEmpty().withMessage('Space city is required'),
  body('pincode').matches(/^\d{6}$/).withMessage('Invalid pincode'),
  body('size').isInt({ min: 1 }).withMessage('Space size must be a positive integer'),
  body('pricePerDay').isFloat({ min: 0 }).withMessage('Price per day must be a non-negative number'),
  body('bankDetails.accountNumber')
    .if(body('owner.role').equals('space_owner'))
    .trim()
    .notEmpty()
    .withMessage('Bank account number is required for Space Owner on first space registration'),
  body('bankDetails.ifscCode')
    .if(body('owner.role').equals('space_owner'))
    .trim()
    .notEmpty()
    .withMessage('IFSC code is required for Space Owner on first space registration'),
  body('bankDetails.bankName')
    .if(body('owner.role').equals('space_owner'))
    .trim()
    .notEmpty()
    .withMessage('Bank name is required for Space Owner on first space registration'),
  body('bankDetails.accountHolderName')
    .if(body('owner.role').equals('space_owner'))
    .trim()
    .notEmpty()
    .withMessage('Account holder name is required for Space Owner on first space registration'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError(errors.array().map(err => err.msg).join(', '));
    }
    next();
  },
];

// Existing auth validators (unchanged)
const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError(errors.array().map(err => err.msg).join(', '));
    }
    next();
  },
];

const validateForgotPassword = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError(errors.array().map(err => err.msg).join(', '));
    }
    next();
  },
];

const validateResetPassword = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('otp').notEmpty().withMessage('OTP is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError(errors.array().map(err => err.msg).join(', '));
    }
    next();
  },
];

export { validateUser, validateSpace, validateLogin, validateForgotPassword, validateResetPassword };