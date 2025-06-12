// src/routes/reportRoutes.js
import express from 'express';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import { getReports } from '../controllers/reportController.js';

const router = express.Router();

router.get('/', protect, getReports); // Optional: restrict to adminOnly

export default router;