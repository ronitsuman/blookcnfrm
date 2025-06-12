import express from 'express';
import { addMovement, getMyMovements } from '../controllers/movementController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addMovement);
router.get('/mine', protect, getMyMovements);

export default router;