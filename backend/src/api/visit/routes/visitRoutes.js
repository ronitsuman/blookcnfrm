import express from 'express';
import multer from 'multer';
import { createVisit, getVisits } from '../controllers/visitController.js';
import { protect } from '../middlewares/authMiddleware.js';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', protect, upload.single('photo'), createVisit);
router.get('/', protect, getVisits);

export default router;