import jwt from 'jsonwebtoken';
import User from '../../api/user/models/User.js';
import { UnauthorizedError, ForbiddenError } from '../../common/error/index.js';

export const authenticate = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedError('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    req.user = { id: user._id, role: user.role };
    next();
  } catch (error) {
    console.error(`Authentication error: ${error.message}`, error.stack);
    res.status(error.statusCode || 401).json({
      error: {
        message: error.message || 'Invalid token',
        status: error.statusCode || 401,
      },
    });
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        error: {
          message: 'You do not have permission to perform this action',
          status: 403,
        },
      });
    }
    next();
  };
};