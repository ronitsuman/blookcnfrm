// import express from 'express';
// import {createSubscription, createSpace, getAllSpaces, getSpace, getPendingSpaces, manageSpaceStatus} from '../controller/space.js';
// import { authenticate } from '../../../shared/middlewares/authMiddleware.js';
// import {protect, adminProtect} from '../../../shared/middlewares/protect.js';

// const router = express.Router();

// // Debug middleware
// router.use((req, res, next) => {
//   console.log('Space request headers:', req.headers);
//   console.log('Space request body:', req.body);
//   next(); 
// });

// // Corrected route order
// router.post('/', authenticate, createSpace);
// router.post('/subscriptions', protect, createSubscription);
// router.get('/getallspaces', getAllSpaces); // Public route to get all approved spaces
// router.get('/pending', adminProtect, getPendingSpaces); // Admin-only pending spaces
// router.get('/:spaceId', getSpace); // Public route to get a specific space
// router.patch('/manage-status', adminProtect, manageSpaceStatus);

// export default router;


//part 2 final
import express from 'express';
import { createSpace, updateUserAccount, getAllSpaces, getSpace, getPendingSpaces, manageSpaceStatus } from '../controller/space.js';
import { authenticate, restrictTo } from '../../../shared/middlewares/authMiddleware.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log('Space request headers:', req.headers);
  console.log('Space request body:', req.body);
  next();
});

router.post('/', authenticate, restrictTo('space_owner'), createSpace);
router.put('/update-account', authenticate, restrictTo('space_owner'), updateUserAccount);
router.get('/getallspaces', getAllSpaces);
router.get('/pending', authenticate, restrictTo('admin'), getPendingSpaces);
router.get('/:spaceId', getSpace);
router.patch('/manage-status', authenticate, restrictTo('admin'), manageSpaceStatus);

export default router;