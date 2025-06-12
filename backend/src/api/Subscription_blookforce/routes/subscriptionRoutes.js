import express from 'express';
import multer from 'multer';
import { protect } from '../middlewares/authMiddleware.js';
import { createSubscription, getSubscriptions } from '../controllers/subscriptionController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', protect, upload.fields([{ name: 'photos', maxCount: 5 }]), createSubscription);
router.get('/', protect, getSubscriptions);

export default router;