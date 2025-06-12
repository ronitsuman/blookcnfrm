import express from 'express';
import {
  createTeleLead,
  getMyTeleLeads,
  updateTeleLead
} from '../controllers/teleLeadController.js';
import { protect, telecallerOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, telecallerOnly, createTeleLead);
router.get('/', protect, telecallerOnly, getMyTeleLeads);
router.put('/:id', protect, telecallerOnly, updateTeleLead);

export default router;