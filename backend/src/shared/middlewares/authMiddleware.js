// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../common/error/index.js';;

const authenticate = (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    if (!decoded) {
      throw new UnauthorizedError('Invalid token');
    }

    // Add user details to the request object
    req.user = decoded; // decoded will have id, email, role
    next();
  } catch (err) {
    console.error(`Error in authenticate middleware: ${err.message}`, err.stack);
    res.status(err.statusCode || 401).json({
      error: {
        message: err.message || 'Authentication failed',
        status: err.statusCode || 401,
      },
    });
  }
};

export { authenticate };