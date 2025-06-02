// // src/api/auth/routes/authRoutes.js
// import express from 'express';
// import { login, forgotPassword, resetPassword } from '../controller/authController.js';

// const router = express.Router();

// // Debug middleware to log incoming request
// router.use((req, res, next) => {
//   console.log('Auth request headers:', req.headers);
//   console.log('Auth request body:', req.body);
//   next();
// });

// // Authentication routes
// router.post('/login', login);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);

// export default router;



//part 2 final 
import express from 'express';
import { login, forgotPassword, resetPassword } from '../controller/authController.js';
import { validateLogin, validateForgotPassword, validateResetPassword } from '../../../shared/middlewares/validators.js';

const router = express.Router();

router.post('/login', validateLogin, login);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/reset-password', validateResetPassword, resetPassword);

export default router;