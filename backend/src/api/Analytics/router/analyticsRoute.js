// backend/src/api/analytics/routes/analyticsRoute.js
import express from 'express';
import { getAnalyticsByUser } from '../controller/analyticsController.js';
import { protect } from '../../../shared/middlewares/protect.js';

const router = express.Router();

router.get('/space', protect, getAnalyticsByUser);

export default router;