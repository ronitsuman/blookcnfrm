import express from 'express';
import { setTarget, getMyTargetProgress } from '../controllers/targetController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin: Set/Update Target
router.post('/', protect, adminOnly, setTarget);

// Agent: Get Own Target Progress
router.get('/progress', protect, getMyTargetProgress);

export default router;