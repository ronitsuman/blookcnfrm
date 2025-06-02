import express from 'express';
import {
  createBooking,
  getUserBookings,
  getSpaceBookings,
  updateBookingStatus,
  cancelBooking,
  verifyRazorpayPayment,
} from '../controller/bookingController.js';
import { authenticate, restrictTo } from '../../../shared/middlewares/authMiddleware.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log('Booking request headers:', req.headers);
  console.log('Booking request body:', req.body);
  console.log('Booking request URL:', req.originalUrl);
  next();
});

router.post('/', authenticate, restrictTo('brand'), createBooking);
router.get('/', authenticate, getUserBookings);
router.get('/space/:spaceId', authenticate, restrictTo('space_owner'), getSpaceBookings);
router.put('/:id', authenticate, restrictTo('space_owner'), updateBookingStatus);
router.delete('/:id', authenticate, cancelBooking);
router.post('/verify-payment', authenticate, verifyRazorpayPayment);

export default router;