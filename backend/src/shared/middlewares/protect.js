// backend/src/common/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../../api/user/models/User.js';
import { UnauthorizedError } from '../../common/error/index.js';

const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedError('Not authorized, no token');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from token
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new UnauthorizedError('Not authorized, user not found');
    }

    // Attach user to request object
    req.user = user;

    next();
  } catch (error) {
    res.status(error.statusCode || 401).json({
      error: {
        message: error.message || 'Not authorized',
        status: error.statusCode || 401,
      },
    });
  }
};

// Middleware to check if user is an admin
const adminProtect = async (req, res, next) => {
  try {
    // First, run the protect middleware to authenticate the user
    await protect(req, res, async () => {
      // Check if the user has admin role
      if (req.user.role !== 'admin') {
        throw new UnauthorizedError('Not authorized, admin access required');
      }

      next();
    });
  } catch (error) {
    res.status(error.statusCode || 401).json({
      error: {
        message: error.message || 'Not authorized',
        status: error.statusCode || 401,
      },
    });
  }
};

export { protect, adminProtect };