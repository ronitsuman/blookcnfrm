import express from 'express';
import { getBookingAnalytics, getFootfallAnalytics } from '../controller/analyticsController.js';
import { authenticate, restrictTo } from '../../../shared/middlewares/authMiddleware.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log('Analytics request headers:', req.headers);
  console.log('Analytics request body:', req.body);
  console.log('Analytics request URL:', req.originalUrl);
  next();
});

router.get('/bookings', authenticate, restrictTo('admin', 'brand', 'space_owner'), getBookingAnalytics);
router.get('/footfall', authenticate, restrictTo('admin', 'space_owner'), getFootfallAnalytics);

export default router;