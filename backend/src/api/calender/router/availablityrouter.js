import express from 'express';
import { createAvailability, getAvailabilities, updateAvailability, deleteAvailability } from '../controller/availiblitycontroller.js';
import { authenticate, restrictTo } from '../../../shared/middlewares/authMiddleware.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log('Availability request headers:', req.headers);
  console.log('Availability request body:', req.body);
  console.log('Availability request URL:', req.originalUrl);
  next();
});

router.post('/', authenticate, restrictTo('space_owner'), createAvailability);
router.get('/space/:spaceId', getAvailabilities);
router.put('/:id', authenticate, restrictTo('space_owner'), updateAvailability);
router.delete('/:id', authenticate, restrictTo('space_owner'), deleteAvailability);

export default router;