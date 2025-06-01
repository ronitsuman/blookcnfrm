// backend/src/api/campaign/routes/campaignRoute.js
import express from 'express';
import { createCampaign } from '../controller/campaignController.js';
import { protect } from '../../../shared/middlewares/protect.js';

const router = express.Router();

router.post('/', protect, createCampaign);

export default router;  