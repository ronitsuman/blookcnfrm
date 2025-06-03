import express from 'express';
import { createSubscription, getSubscriptions, createEscrowPayment } from '../controller/subscriptionController.js';
import { authenticate, restrictTo } from '../../../shared/middlewares/authMiddleware.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log('Subscription request headers:', req.headers);
  console.log('Subscription request body:', req.body);
  console.log('Subscription request URL:', req.originalUrl);
  next();
});

router.post('/', authenticate, restrictTo('brand', 'space_owner', 'vendor', 'blookforce'), createSubscription);
router.get('/', authenticate, restrictTo('brand', 'space_owner', 'vendor', 'blookforce'), getSubscriptions);
router.post('/brand/:id/escrow', authenticate, restrictTo('brand'), createEscrowPayment);

export default router;