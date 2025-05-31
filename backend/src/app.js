// src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import authRoutes from './api/auth/routes/authRoutes.js';
import userRoutes from './api/user/routes/userRoutes.js';
import { loadEnv } from './shared/config/env.js';
import spaceRoutes from './api/space/routes/spaceRoutes.js';

loadEnv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin:  '*', credentials: true }));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/spaces',spaceRoutes)

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`, { stack: err.stack, path: req.path, method: req.method });
  res.status(err.statusCode || 500).json({
    error: {
      message: err.message || 'Internal server error',
      status: err.statusCode || 500,
    },
  });
});

export default app;
