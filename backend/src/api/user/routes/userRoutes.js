// src/api/user/routes/userRoutes.js
import express from 'express';
import fileUpload from 'express-fileupload';
import { createUser, getMe } from '../controller/userController.js';
import {  validateUser,  } from '../../../shared/middlewares/validators.js';
import { authenticate } from '../../../shared/middlewares/authMiddleware.js';

const router = express.Router();

router.use(fileUpload());
router.post('/', validateUser, createUser);
router.get('/me', authenticate, getMe);

export default router;