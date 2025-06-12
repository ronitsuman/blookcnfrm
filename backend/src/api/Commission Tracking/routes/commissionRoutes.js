import express from 'express';
import { getMyCommissions } from '../controllers/commissionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getMyCommissions);

export default router;