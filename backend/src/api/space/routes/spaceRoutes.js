// src/api/space/routes/spaceRoutes.js
import express from 'express';
import {createSubscription, createSpace, getAllSpaces, getSpace,getPendingSpaces,manageSpaceStatus } from '../controller/space.js';;
import { authenticate } from '../../../shared/middlewares/authMiddleware.js';
import {protect, adminProtect } from '../../../shared/middlewares/protect.js';
;


const router = express.Router();

// Debug middleware to log incoming request
router.use((req, res, next) => {
  console.log('Space request headers:', req.headers);
  console.log('Space request body:', req.body);

  next();
});

// Space routes
router.post('/', authenticate, createSpace);
router.post('/subscriptions', protect, createSubscription);
router.get('/approved', getAllSpaces);
router.get('/', getAllSpaces); // Public route to get all approved spaces
router.get('/:spaceId', getSpace); // Public route to get a specific space
router.get('/pending', adminProtect, getPendingSpaces); // Use adminProtect
router.post('/manage-status', adminProtect, manageSpaceStatus); // Use adminProtect


export default router;