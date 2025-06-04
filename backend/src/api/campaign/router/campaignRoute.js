// // backend/src/api/campaign/routes/campaignRoute.js
// import express from 'express';
// import { createCampaign } from '../controller/campaignController.js';
// import { protect } from '../../../shared/middlewares/protect.js';

// const router = express.Router();

// router.post('/', protect, createCampaign);

// export default router;  


import express from 'express';
import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  getCampaignAnalytics,
} from '../controller/campaignController.js';
import {authenticate} from '../../../shared/middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

// Routes
// Routes
router.post('/', createCampaign);
router.get('/', getCampaigns);
router.get('/analytics', getCampaignAnalytics); // Moved before /:id to avoid conflict
router.get('/:id', getCampaignById);
router.patch('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

export default router;