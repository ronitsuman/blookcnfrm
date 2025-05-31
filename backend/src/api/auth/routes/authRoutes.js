// src/api/auth/routes/authRoutes.js
import express from 'express';
import { login, forgotPassword, resetPassword } from '../controller/authController.js';

const router = express.Router();

// Debug middleware to log incoming request
router.use((req, res, next) => {
  console.log('Auth request headers:', req.headers);
  console.log('Auth request body:', req.body);
  next();
});

// Authentication routes
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;