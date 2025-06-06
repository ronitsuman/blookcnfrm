// // src/api/space/controllers/spaceController.js
// import Space from '../model/Space.js';
// import User from '../../user/models/User.js';
// import { uploadImageBase64 } from '../../../integrations/cloudinary/cloudinary.config.js';
// import { BadRequestError, UnauthorizedError } from '../../../common/error/index.js';

// // const createSpace = async (req, res) => {
// //     try {
// //       const {
// //         name,
// //         type,
// //         managerName,
// //         phone,
// //         email,
// //         address,
// //         city,
// //         pincode,
// //         landmark,
// //         location,
// //         weekdayFootfall,
// //         weekendFootfall,
// //         brandingAreaSize,
// //         hasCCTV,
// //         cameraCount,
// //         cameraAligned,
// //         complianceDetails,
// //         heatMapping,
// //         listingType,
// //         preferredTiming,
// //         photos,
// //         price,
// //         agentId,
// //       } = req.body;
// //       const userId = req.user?.id;
  
// //       // Validate userId
// //       if (!userId) {
// //         throw new UnauthorizedError('User not authenticated');
// //       }
  
// //       // Fetch user from database
// //       const user = await User.findById(userId);
// //       if (!user) {
// //         throw new UnauthorizedError('User not found');
// //       }
  
// //       // Validate user role
// //       if (user.role !== 'space_owner') {
// //         throw new UnauthorizedError('Only Space Owners can register spaces');
// //       }
  
// //       // Validate required fields
// //       if (!name || !type || !managerName || !phone || !address || !city || !pincode || !price) {
// //         throw new BadRequestError('Name, type, manager name, phone, address, city, pincode, and price are required');
// //       }
  
// //       const validSpaceTypes = ['RWA', 'Mall', 'Retail', 'Cafe', 'store', 'salon', 'gym', 'other'];
// //       if (!validSpaceTypes.includes(type)) {
// //         throw new BadRequestError('Invalid space type');
// //       }
  
// //       // If hasCCTV is 'yes', cameraCount and cameraAligned are required
// //       if (hasCCTV === 'yes') {
// //         if (!cameraCount || !cameraAligned) {
// //           throw new BadRequestError('Camera count and alignment are required if CCTV is present');
// //         }
// //       }
  
// //       // Validate location coordinates
// //       if (!location || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
// //         throw new BadRequestError('Valid location coordinates (longitude, latitude) are required');
// //       }
  
// //       // Check if this is the user's first space
// //       if (!Array.isArray(user.spaces)) {
// //         user.spaces = [];
// //       }
// //       const isFirstSpace = user.spaces.length === 0;
  
// //       // If first space, bankDetails are required
// //       let bankDetails = req.body.bankDetails;
// //       if (isFirstSpace) {
// //         if (!bankDetails || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName) {
// //           throw new BadRequestError('All bank details (account number, IFSC code, bank name, account holder name) are required for your first space');
// //         }
// //       }
  
// //       // Validate and upload photos (at least one photo required for exterior)
// //       if (!photos || !Array.isArray(photos) || photos.length === 0) {
// //         throw new BadRequestError('At least one exterior photo is required');
// //       }
  
// //       const uploadedPhotos = await Promise.all(
// //         photos.map(async (photoBase64) => {
// //           if (photoBase64) {
// //             return await uploadImageBase64(photoBase64, 'blookmyspace1/spaces');
// //           }
// //           return null;
// //         })
// //       );
// //       const filteredPhotos = uploadedPhotos.filter(url => url);
  
// //       // Create new space
// //       const space = await Space.create({
// //         owner: userId,
// //         name,
// //         type,
// //         managerName,
// //         phone,
// //         email,
// //         address,
// //         city,
// //         pincode,
// //         landmark,
// //         location: {
// //           type: 'Point',
// //           coordinates: location.coordinates,
// //         },
// //         weekdayFootfall: weekdayFootfall ? Number(weekdayFootfall) : undefined,
// //         weekendFootfall: weekendFootfall ? Number(weekendFootfall) : undefined,
// //         brandingAreaSize,
// //         hasCCTV,
// //         cameraCount: cameraCount ? Number(cameraCount) : undefined,
// //         cameraAligned,
// //         complianceDetails: complianceDetails || {},
// //         heatMapping,
// //         listingType: listingType || 'free',
// //         preferredTiming,
// //         photos: filteredPhotos,
// //         price: Number(price),
// //         agentId,
// //       });
  
// //       // Update user's spaces and spaceCount
// //       user.spaces.push(space._id);
// //       user.spaceCount = user.spaces.length; // No need for additional check since spaceCount is now defaulted in schema
  
// //       if (isFirstSpace && bankDetails) {
// //         user.bankDetails = bankDetails;
// //       }
  
// //       await user.save();
  
// //       res.status(201).json({
// //         status: 'success',
// //         message: 'Space registered',
// //         data: {
// //           space: {
// //             id: space._id,
// //             name: space.name,
// //             type: space.type,
// //             managerName: space.managerName,
// //             phone: space.phone,
// //             email: space.email,
// //             address: space.address,
// //             city: space.city,
// //             pincode: space.pincode,
// //             landmark: space.landmark,
// //             location: space.location,
// //             weekdayFootfall: space.weekdayFootfall,
// //             weekendFootfall: space.weekendFootfall,
// //             brandingAreaSize: space.brandingAreaSize,
// //             hasCCTV: space.hasCCTV,
// //             cameraCount: space.cameraCount,
// //             cameraAligned: space.cameraAligned,
// //             complianceDetails: space.complianceDetails,
// //             heatMapping: space.heatMapping,
// //             listingType: space.listingType,
// //             preferredTiming: space.preferredTiming,
// //             photos: space.photos,
// //             price: space.price,
// //             status: space.status,
// //             agentId: space.agentId,
// //           },
// //         },
// //       });
// //     } catch (err) {
// //       console.error(`Error in createSpace: ${err.message}`, err.stack);
// //       res.status(err.statusCode || 500).json({
// //         error: {
// //           message: err.message || 'Internal server error',
// //           status: err.statusCode || 500,
// //         },
// //       });
// //     }
// //   };

// // const createSpace = async (req, res) => {
// //   try {
// //     console.log('Received request body:', req.body); // Debug log to check incoming data

// //     const {
// //       name,
// //       type,
// //       managerName,
// //       phone,
// //       email,
// //       address,
// //       city,
// //       pincode,
// //       landmark,
// //       location,
// //       weekdayFootfall,
// //       weekendFootfall,
// //       brandingAreaSize,
// //       hasCCTV,
// //       cameraCount,
// //       cameraAligned,
// //       complianceDetails,
// //       heatMapping,
// //       listingType,
// //       preferredTiming,
// //       photos,
// //       price,
// //       agentId,
// //     } = req.body;
// //     const userId = req.user?.id;

// //     // Validate userId
// //     if (!userId) {
// //       throw new UnauthorizedError('User not authenticated');
// //     }

// //     // Fetch user from database
// //     const user = await User.findById(userId);
// //     if (!user) {
// //       throw new UnauthorizedError('User not found');
// //     }

// //     // Validate user role
// //     if (user.role !== 'space_owner') {
// //       throw new UnauthorizedError('Only Space Owners can register spaces');
// //     }

// //     // Validate required fields
// //     if (!name || !type || !managerName || !phone || !address || !city || !pincode || !price) {
// //       throw new BadRequestError('Name, type, manager name, phone, address, city, pincode, and price are required');
// //     }

// //     const validSpaceTypes = ['RWA', 'Mall', 'Retail', 'Cafe', 'store', 'salon', 'gym', 'other'];
// //     if (!validSpaceTypes.includes(type)) {
// //       throw new BadRequestError('Invalid space type');
// //     }

// //     // If hasCCTV is 'yes', cameraCount and cameraAligned are required
// //     if (hasCCTV === 'yes') {
// //       if (!cameraCount || !cameraAligned) {
// //         throw new BadRequestError('Camera count and alignment are required if CCTV is present');
// //       }
// //     }

// //     // Validate location coordinates
// //     if (!location || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
// //       throw new BadRequestError('Valid location coordinates (longitude, latitude) are required');
// //     }

// //     // Check if this is the user's first space
// //     if (!Array.isArray(user.spaces)) {
// //       user.spaces = [];
// //     }
// //     const isFirstSpace = user.spaces.length === 0;

// //     // If first space, bankDetails are required
// //     let bankDetails = req.body.bankDetails;
// //     if (isFirstSpace) {
// //       if (!bankDetails || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName) {
// //         throw new BadRequestError('All bank details (account number, IFSC code, bank name, account holder name) are required for your first space');
// //       }
// //     }

// //     // Validate and upload photos (at least one photo required for exterior)
// //     if (!photos || !Array.isArray(photos) || photos.length === 0) {
// //       throw new BadRequestError('At least one exterior photo is required');
// //     }

// //     const uploadedPhotos = await Promise.all(
// //       photos.map(async (photoBase64) => {
// //         if (photoBase64) {
// //           return await uploadImageBase64(photoBase64, 'blookmyspace1/spaces');
// //         }
// //         return null;
// //       })
// //     );

// //     // Log success message after photos are uploaded
// //     console.log(`Images successfully uploaded to Cloudinary. Total photos uploaded: ${uploadedPhotos.length}`, {
// //       uploadedPhotoURLs: uploadedPhotos.filter(url => url), // Only log non-null URLs
// //     });

// //     const filteredPhotos = uploadedPhotos.filter(url => url);

// //     // Create new space
// //     const space = await Space.create({
// //       owner: userId,
// //       name,
// //       type,
// //       managerName,
// //       phone,
// //       email,
// //       address,
// //       city,
// //       pincode,
// //       landmark,
// //       location: {
// //         type: 'Point',
// //         coordinates: location.coordinates,
// //       },
// //       weekdayFootfall: weekdayFootfall ? Number(weekdayFootfall) : undefined,
// //       weekendFootfall: weekendFootfall ? Number(weekendFootfall) : undefined,
// //       brandingAreaSize,
// //       hasCCTV,
// //       cameraCount: cameraCount ? Number(cameraCount) : undefined,
// //       cameraAligned,
// //       complianceDetails: complianceDetails || {},
// //       heatMapping,
// //       listingType: listingType || 'free',
// //       preferredTiming,
// //       photos: filteredPhotos,
// //       price: Number(price),
// //       agentId, 
// //     });

// //     // Update user's spaces and spaceCount
// //     user.spaces.push(space._id);
// //     user.spaceCount = user.spaces.length;

// //     if (isFirstSpace && bankDetails) {
// //       user.bankDetails = bankDetails;
// //     }

// //     await user.save();

// //     res.status(201).json({
// //       status: 'success',
// //       message: 'Space registered',
// //       data: {
// //         space: {
// //           id: space._id,
// //           name: space.name,
// //           type: space.type,
// //           managerName: space.managerName,
// //           phone: space.phone,
// //           email: space.email,
// //           address: space.address,
// //           city: space.city,
// //           pincode: space.pincode,
// //           landmark: space.landmark,
// //           location: space.location,
// //           weekdayFootfall: space.weekdayFootfall,
// //           weekendFootfall: space.weekendFootfall,
// //           brandingAreaSize: space.brandingAreaSize,
// //           hasCCTV: space.hasCCTV,
// //           cameraCount: space.cameraCount,
// //           cameraAligned: space.cameraAligned,
// //           complianceDetails: space.complianceDetails,
// //           heatMapping: space.heatMapping,
// //           listingType: space.listingType,
// //           preferredTiming: space.preferredTiming,
// //           photos: space.photos,
// //           price: space.price,
// //           status: space.status,
// //           agentId: space.agentId,
// //         },
// //       },
// //     });
// //   } catch (err) {
// //     console.error(`Error in createSpace: ${err.message}`, err.stack);
// //     res.status(err.statusCode || 500).json({
// //       error: {
// //         message: err.message || 'Internal server error',
// //         status: err.statusCode || 500,
// //       },
// //     });
// //   }
// // };
 
// const createSpace = async (req, res) => {
//   try {
//     console.log('Received request body:', req.body); // Debug log to check incoming data

//     const {
//       name,
//       type,
//       managerName,
//       phone,
//       email,
//       address,
//       city,
//       pincode,
//       landmark,
//       location,
//       weekdayFootfall,
//       weekendFootfall,
//       brandingAreaSize,
//       hasCCTV,
//       cameraCount,
//       cameraAligned,
//       complianceDetails,
//       heatMapping,
//       listingType,
//       preferredTiming,
//       photos,
//       price,
//       agentId,
//     } = req.body;
//     const userId = req.user?.id;

//     // Validate userId
//     if (!userId) {
//       throw new UnauthorizedError('User not authenticated');
//     }

//     // Fetch user from database
//     const user = await User.findById(userId);
//     if (!user) {
//       throw new UnauthorizedError('User not found');
//     }

//     // Validate user role
//     if (user.role !== 'space_owner') {
//       throw new UnauthorizedError('Only Space Owners can register spaces');
//     }

//     // Validate required fields
//     if (!name || !type || !managerName || !phone || !address || !city || !pincode || !price) {
//       throw new BadRequestError('Name, type, manager name, phone, address, city, pincode, and price are required');
//     }

//     const validSpaceTypes = ['RWA', 'Mall', 'Retail', 'Cafe', 'store', 'salon', 'gym', 'other'];
//     if (!validSpaceTypes.includes(type)) {
//       throw new BadRequestError('Invalid space type');
//     }

//     // If hasCCTV is 'yes', cameraCount and cameraAligned are required
//     if (hasCCTV === 'yes') {
//       if (!cameraCount || !cameraAligned) {
//         throw new BadRequestError('Camera count and alignment are required if CCTV is present');
//       }
//     }

//     // Validate location coordinates
//     if (!location || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
//       throw new BadRequestError('Valid location coordinates (longitude, latitude) are required');
//     }

//     // Check for duplicate space creation (based on name and userId)
//     const existingSpace = await Space.findOne({ name, owner: userId });
//     if (existingSpace) {
//       throw new BadRequestError('A space with this name already exists for this user');
//     }

//     // Check if this is the user's first space
//     if (!Array.isArray(user.spaces)) {
//       user.spaces = [];
//     }
//     const isFirstSpace = user.spaces.length === 0;

//     // If first space, bankDetails are required
//     let bankDetails = req.body.bankDetails;
//     if (isFirstSpace) {
//       if (!bankDetails || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName) {
//         throw new BadRequestError('All bank details (account number, IFSC code, bank name, account holder name) are required for your first space');
//       }
//     }

//     // Validate and upload photos (at least one photo required for exterior)
//     if (!photos || !Array.isArray(photos) || photos.length === 0) {
//       throw new BadRequestError('At least one exterior photo is required');
//     }

//     const uploadedPhotos = await Promise.all(
//       photos.map(async (photoBase64) => {
//         if (photoBase64) {
//           return await uploadImageBase64(photoBase64, 'blookmyspace1/spaces');
//         }
//         return null;
//       })
//     );

//     // Log success message after photos are uploaded
//     console.log(`Images successfully uploaded to Cloudinary. Total photos uploaded: ${uploadedPhotos.length}`, {
//       uploadedPhotoURLs: uploadedPhotos.filter(url => url), // Only log non-null URLs
//     });

//     const filteredPhotos = uploadedPhotos.filter(url => url);

//     // Create new space
//     const space = await Space.create({
//       owner: userId,
//       name,
//       type,
//       managerName,
//       phone,
//       email,
//       address,
//       city,
//       pincode,
//       landmark,
//       location: {
//         type: 'Point',
//         coordinates: location.coordinates,
//       },
//       weekdayFootfall: weekdayFootfall ? Number(weekdayFootfall) : undefined,
//       weekendFootfall: weekendFootfall ? Number(weekendFootfall) : undefined,
//       brandingAreaSize,
//       hasCCTV,
//       cameraCount: cameraCount ? Number(cameraCount) : undefined,
//       cameraAligned,
//       complianceDetails: complianceDetails || {},
//       heatMapping,
//       listingType: listingType || 'free',
//       preferredTiming,
//       photos: filteredPhotos,
//       price: Number(price),
//       agentId,
//       status: 'pending'
//     });

//     // Update user's spaces and spaceCount
//     user.spaces.push(space._id);
//     user.spaceCount = user.spaces.length;

//     if (isFirstSpace && bankDetails) {
//       user.bankDetails = bankDetails;
//     }

//     await user.save();

//     res.status(201).json({
//       status: 'success',
//       message: 'Space registered',
//       data: {
//         space: {
//           id: space._id,
//           name: space.name,
//           type: space.type,
//           managerName: space.managerName,
//           phone: space.phone,
//           email: space.email,
//           address: space.address,
//           city: space.city,
//           pincode: space.pincode,
//           landmark: space.landmark,
//           location: space.location,
//           weekdayFootfall: space.weekdayFootfall,
//           weekendFootfall: space.weekendFootfall,
//           brandingAreaSize: space.brandingAreaSize,
//           hasCCTV: space.hasCCTV,
//           cameraCount: space.cameraCount,
//           cameraAligned: space.cameraAligned,
//           complianceDetails: space.complianceDetails,
//           heatMapping: space.heatMapping,
//           listingType: space.listingType,
//           preferredTiming: space.preferredTiming,
//           photos: space.photos,
//           price: space.price,
//           status: space.status,
//           agentId: space.agentId,
//         },
//       },
//     });
//   } catch (err) {
//     console.error(`Error in createSpace: ${err.message}`, {
//       stack: err.stack,
//       requestBody: req.body,
//       userId: req.user?.id,
//     });
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

// const getAllSpaces = async (req, res) => {
//   try {
//     const {
//       searchQuery,
//       city,
//       type,
//       minPrice,
//       maxPrice,
//       weekdayFootfallMin,
//       weekdayFootfallMax,
//     } = req.query;

//     const query = { status: 'approved' };

//     if (searchQuery) {
//       query.$or = [
//         { name: { $regex: searchQuery, $options: 'i' } },
//         { address: { $regex: searchQuery, $options: 'i' } },
//         { city: { $regex: searchQuery, $options: 'i' } },
//       ];
//     }

//     if (city) {
//       query.city = { $regex: city, $options: 'i' };
//     }

//     if (type) {
//       const types = type.split(',');
//       query.type = { $in: types };
//     }

//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     if (weekdayFootfallMin || weekdayFootfallMax) {
//       query.weekdayFootfall = {};
//       if (weekdayFootfallMin) query.weekdayFootfall.$gte = Number(weekdayFootfallMin);
//       if (weekdayFootfallMax) query.weekdayFootfall.$lte = Number(weekdayFootfallMax);
//     }

//     const spaces = await Space.find(query);
//     res.status(200).json({
//       status: 'success',
//       data: spaces,
//     });
//   } catch (err) {
//     console.error(`Error in getAllSpaces: ${err.message}`, err.stack);
//     res.status(500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: 500,
//       },
//     });
//   }
// };

// // const getSpace = async (req, res) => {
// //   try {
// //     const { spaceId } = req.params;

// //     // Validate space ID format
// //     if (!spaceId.match(/^[0-9a-fA-F]{24}$/)) {
// //       throw new BadRequestError('Invalid space ID');
// //     }

// //     const space = await Space.findById(spaceId);
// //     if (!space) {
// //       throw new BadRequestError('Space not found');
// //     }

// //     res.status(200).json({
// //       status: 'success',
// //       data: space,
// //     });
// //   } catch (err) {
// //     console.error(`Error in getSpace: ${err.message}`, err.stack);
// //     res.status(err.statusCode || 500).json({
// //       error: {
// //         message: err.message || 'Internal server error',
// //         status: err.statusCode || 500,
// //       },
// //     });
// //   }
// // };

// const getSpace = async (req, res) => {
//   try {
//     const { spaceId } = req.params;

//     // Log the spaceId for debugging
//     console.log('Received spaceId:', spaceId);

//     // Validate spaceId
//     if (!spaceId) {
//       throw new BadRequestError('Space ID is required');
//     }

//     // Check if spaceId is a valid MongoDB ObjectId (24-character hexadecimal)
//     if (!spaceId.match(/^[0-9a-fA-F]{24}$/)) {
//       throw new BadRequestError(`Invalid space ID: ${spaceId}. It must be a 24-character hexadecimal string.`);
//     }

//     const space = await Space.findById(spaceId).populate('owner', 'email name');
//     if (!space) {
//       throw new BadRequestError('Space not found');
//     }

//     res.status(200).json({
//       status: 'success',
//       data: space,
//     });
//   } catch (err) {
//     console.error(`Error in getSpace: ${err.message}`, {
//       stack: err.stack,
//       spaceId: req.params.spaceId,
//     });
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

// const createSubscription = async (req, res) => {
//   try {
//     const { spaceId, plan, agentId } = req.body;
//     const userId = req.user?.id;

//     // Validate user
//     if (!userId) {
//       throw new UnauthorizedError('User not authenticated');
//     }

//     // Validate required fields
//     if (!spaceId || !plan || !agentId) {
//       throw new BadRequestError('Space ID, plan, and agent ID are required');
//     }

//     // Validate space
//     const space = await Space.findById(spaceId);
//     if (!space) {
//       throw new BadRequestError('Space not found');
//     }

//     // Validate plan
//     const validPlans = ['free', 'premium'];
//     if (!validPlans.includes(plan)) {
//       throw new BadRequestError('Invalid plan type');
//     }

//     // Create subscription
//     const subscription = await Subscription.create({
//       spaceId,
//       plan,
//       agentId,
//       status: 'active',
//     });

//     res.status(201).json({
//       status: 'success',
//       message: 'Subscription created successfully',
//       data: {
//         subscription: {
//           id: subscription._id,
//           spaceId: subscription.spaceId,
//           plan: subscription.plan,
//           agentId: subscription.agentId,
//           status: subscription.status,
//         },
//       },
//     });
//   } catch (err) {
//     console.error(`Error in createSubscription: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

// // Get Pending Spaces for Admin
// // const getPendingSpaces = async (req, res) => {
// //   try {
// //     const userId = req.user?.id;
// //     if (!userId) throw new UnauthorizedError('User not authenticated');
// //     const user = await User.findById(userId);
// //     if (!user) throw new UnauthorizedError('User not found');
// //     if (user.role !== 'admin') throw new UnauthorizedError('Only admins can view pending spaces');

// //     const page = parseInt(req.query.page) || 1;
// //     const limit = parseInt(req.query.limit) || 10;
// //     const skip = (page - 1) * limit;

// //     const pendingSpaces = await Space.find({ status: 'pending' })
// //       .populate('owner', 'email name')
// //       .skip(skip)
// //       .limit(limit);

// //     const total = await Space.countDocuments({ status: 'pending' });

// //     res.status(200).json({
// //       status: 'success',
// //       data: {
// //         spaces: pendingSpaces,
// //         pagination: {
// //           total,
// //           page,
// //           pages: Math.ceil(total / limit),
// //           limit,
// //         },
// //       },
// //     });
// //   } catch (err) {
// //     res.status(err.statusCode || 500).json({
// //       error: { message: err.message || 'Internal server error', status: err.statusCode || 500 },
// //     });
// //   }
// // };

// // backend/src/api/space/controllers/spaceController.js
// // const getPendingSpaces = async (req, res) => {
// //   try {
// //     const userId = req.user?.id;
// //     if (!userId) throw new UnauthorizedError('User not authenticated');
// //     const user = await User.findById(userId);
// //     if (!user) throw new UnauthorizedError('User not found');
// //     if (user.role !== 'admin') throw new UnauthorizedError('Only admins can view pending spaces');

// //     const page = parseInt(req.query.page) || 1;
// //     const limit = parseInt(req.query.limit) || 10;
// //     const skip = (page - 1) * limit;

// //     const pendingSpaces = await Space.find({ status: 'pending' })
// //       .populate('owner', 'email name')
// //       .skip(skip)
// //       .limit(limit);

// //     // Debug log to check the response data
// //     console.log('Pending spaces fetched:', pendingSpaces.map(space => ({ _id: space._id, name: space.name })));

// //     const total = await Space.countDocuments({ status: 'pending' });

// //     res.status(200).json({
// //       status: 'success',
// //       data: {
// //         spaces: pendingSpaces,
// //         pagination: {
// //           total,
// //           page,
// //           pages: Math.ceil(total / limit),
// //           limit,
// //         },
// //       },
// //     });
// //   } catch (err) {
// //     console.error(`Error in getPendingSpaces: ${err.message}`, {
// //       stack: err.stack,
// //       userId: req.user?.id,
// //     });
// //     res.status(err.statusCode || 500).json({
// //       error: { message: err.message || 'Internal server error', status: err.statusCode || 500 },
// //     });
// //   }
// // };
// // backend/src/api/space/controllers/spaceController.js
// // backend/src/api/space/controllers/spaceController.js
// const getPendingSpaces = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) throw new UnauthorizedError('User not authenticated');
//     const user = await User.findById(userId);
//     if (!user) throw new UnauthorizedError('User not found');
//     if (user.role !== 'admin') throw new UnauthorizedError('Only admins can view pending spaces');

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     // Fetch pending spaces with explicit _id inclusion
//     const pendingSpaces = await Space.find({ status: 'pending' })
//       .populate('owner', 'email name')
//       .skip(skip)
//       .limit(limit)
//       .select('_id name type managerName phone address city pincode price listingType photos status'); // Explicitly include _id

//     // Debug log to check the raw response from Mongoose
//     console.log('Raw pending spaces from Mongoose:', pendingSpaces);

//     const total = await Space.countDocuments({ status: 'pending' });

//     // Transform the response to ensure _id is included as a string
//     const spacesResponse = pendingSpaces.map(space => ({
//       _id: space._id.toString(), // Convert ObjectId to string
//       name: space.name,
//       type: space.type,
//       managerName: space.managerName,
//       phone: space.phone,
//       address: space.address,
//       city: space.city,
//       pincode: space.pincode,
//       price: space.price,
//       listingType: space.listingType,
//       photos: space.photos,
//       status: space.status,
//       owner: space.owner,
//     }));

//     console.log('Transformed spaces response:', spacesResponse);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         spaces: spacesResponse,
//         pagination: {
//           total,
//           page,
//           pages: Math.ceil(total / limit),
//           limit,
//         },
//       },
//     });
//   } catch (err) {
//     console.error(`Error in getPendingSpaces: ${err.message}`, {
//       stack: err.stack,
//       userId: req.user?.id,
//     });
//     res.status(err.statusCode || 500).json({
//       error: { message: err.message || 'Internal server error', status: err.statusCode || 500 },
//     });
//   }
// };

// // Manage Space Status (Approve/Reject)
// const manageSpaceStatus = async (req, res) => {
//   try {
//     const { spaceId, action } = req.body;
//     const userId = req.user?.id;

//     if (!userId) throw new UnauthorizedError('User not authenticated');
//     const user = await User.findById(userId);
//     if (!user) throw new UnauthorizedError('User not found');
//     if (user.role !== 'admin') throw new UnauthorizedError('Only admins can manage space status');

//     if (!spaceId || !action) throw new BadRequestError('Space ID and action (approve/reject) are required');
//     if (!['approve', 'reject'].includes(action)) throw new BadRequestError('Action must be either "approve" or "reject"');

//     const space = await Space.findById(spaceId);
//     if (!space) throw new BadRequestError('Space not found');
//     if (space.status !== 'pending') throw new BadRequestError('Space is already processed');

//     space.status = action === 'approve' ? 'approved' : 'rejected';
//     await space.save();

//     res.status(200).json({
//       status: 'success',
//       message: `Space ${action}ed successfully`,
//       data: { space },
//     });
//   } catch (err) {
//     res.status(err.statusCode || 500).json({
//       error: { message: err.message || 'Internal server error', status: err.statusCode || 500 },
//     });
//   }
// };

// export { createSpace, getAllSpaces, getSpace ,createSubscription ,manageSpaceStatus ,getPendingSpaces };

// //part 2 final 
// import Space from '../model/Space.js';
// import User from '../../user/models/User.js';
// import { uploadImageBase64 } from '../../../integrations/cloudinary/cloudinary.config.js';
// import { BadRequestError, UnauthorizedError } from '../../../common/error/index.js';

// const createSpace = async (req, res) => {
//   try {
//     console.log('Received request body:', req.body);

//     const {
//       name, type, managerName, phone, email, address, city, pincode, landmark,
//       location, weekdayFootfall, weekendFootfall, brandingAreaSize, hasCCTV,
//       cameraCount, cameraAligned, complianceDetails, heatMapping, listingType,
//       preferredTiming, photos, price, agentId, bankDetails, ageGroupMix,
//     } = req.body;
//     const userId = req.user?.id;

//     if (!userId) throw new UnauthorizedError('User not authenticated');

//     const user = await User.findById(userId);
//     if (!user) throw new UnauthorizedError('User not found');
//     if (user.role !== 'space_owner') throw new UnauthorizedError('Only Space Owners can register spaces');

//     if (!name || !type || !managerName || !phone || !address || !city || !pincode || !price) {
//       throw new BadRequestError('Name, type, manager name, phone, address, city, pincode, and price are required');
//     }

//     const validSpaceTypes = ['RWA', 'Mall', 'Retail', 'Cafe', 'store', 'salon', 'gym', 'other'];
//     if (!validSpaceTypes.includes(type)) throw new BadRequestError('Invalid space type');

//     if (hasCCTV === 'yes' && (!cameraCount || !cameraAligned)) {
//       throw new BadRequestError('Camera count and alignment are required if CCTV is present');
//     }

//     if (!location || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
//       throw new BadRequestError('Valid location coordinates (longitude, latitude) are required');
//     }

//     const existingSpace = await Space.findOne({ name, owner: userId });
//     if (existingSpace) throw new BadRequestError('A space with this name already exists for this user');

//     const isFirstSpace = !user.spaces || user.spaces.length === 0;

//     if (isFirstSpace && (!bankDetails || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName)) {
//       throw new BadRequestError('All bank details are required for your first space');
//     }

//     if (!photos || !Array.isArray(photos) || photos.length === 0) {
//       throw new BadRequestError('At least one photo is required');
//     }

//     const uploadedPhotos = await Promise.all(
//       photos.map(async (photoBase64) => {
//         if (photoBase64 && typeof photoBase64 === 'string' && photoBase64.startsWith('data:image/')) {
//           return await uploadImageBase64(photoBase64, 'blookmyspace1/spaces');
//         }
//         return null;
//       })
//     );
//     const filteredPhotos = uploadedPhotos.filter(url => url);
//     if (filteredPhotos.length === 0) throw new BadRequestError('At least one valid photo is required');

//     const space = await Space.create({
//       owner: userId,
//       name,
//       type,
//       managerName,
//       phone,
//       email,
//       address,
//       city,
//       pincode,
//       landmark,
//       location: {
//         type: 'Point',
//         coordinates: [parseFloat(location.coordinates[0]), parseFloat(location.coordinates[1])],
//       },
//       weekdayFootfall: weekdayFootfall ? Number(weekdayFootfall) : undefined,
//       weekendFootfall: weekendFootfall ? Number(weekendFootfall) : undefined,
//       brandingAreaSize,
//       hasCCTV,
//       cameraCount: cameraCount ? Number(cameraCount) : undefined,
//       cameraAligned,
//       complianceDetails: complianceDetails || {},
//       heatMapping,
//       listingType: listingType || 'free',
//       preferredTiming,
//       photos: filteredPhotos,
//       price: Number(price),
//       agentId,
//       ageGroupMix,
//       status: 'pending',
//     });

//     if (!user.spaces) user.spaces = [];
//     user.spaces.push(space._id);
//     user.spaceCount = user.spaces.length;

//     if (isFirstSpace && bankDetails) {
//       user.bankDetails = bankDetails;
//     }

//     await user.save();

//     res.status(201).json({
//       status: 'success',
//       message: 'Space registered',
//       data: { space },
//     });
//   } catch (err) {
//     console.error(`Error in createSpace: ${err.message}`, {
//       stack: err.stack,
//       requestBody: req.body,
//       userId: req.user?.id,
//     });
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

// const updateUserAccount = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     const { bankDetails } = req.body;

//     if (!userId) throw new UnauthorizedError('User not authenticated');

//     const user = await User.findById(userId);
//     if (!user) throw new UnauthorizedError('User not found');

//     if (!bankDetails || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName) {
//       throw new BadRequestError('All bank details are required');
//     }

//     user.bankDetails = bankDetails;
//     await user.save();

//     res.status(200).json({
//       status: 'success',
//       message: 'Bank details updated successfully',
//       data: { bankDetails: user.bankDetails },
//     });
//   } catch (err) {
//     console.error(`Error in updateUserAccount: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

// const getAllSpaces = async (req, res) => {
//   try {
//     const { searchQuery, city, type, minPrice, maxPrice, weekdayFootfallMin, weekdayFootfallMax } = req.query;
//     const query = { status: 'approved' };

//     if (searchQuery) {
//       query.$or = [
//         { name: { $regex: searchQuery, $options: 'i' } },
//         { address: { $regex: searchQuery, $options: 'i' } },
//         { city: { $regex: searchQuery, $options: 'i' } },
//       ];
//     }

//     if (city) query.city = { $regex: city, $options: 'i' };
//     if (type) query.type = { $in: type.split(',') };
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }
//     if (weekdayFootfallMin || weekdayFootfallMax) {
//       query.weekdayFootfall = {};
//       if (weekdayFootfallMin) query.weekdayFootfall.$gte = Number(weekdayFootfallMin);
//       if (weekdayFootfallMax) query.weekdayFootfall.$lte = Number(weekdayFootfallMax);
//     }

//     const spaces = await Space.find(query).populate('owner', 'name email');
//     res.status(200).json({
//       status: 'success',
//       data: spaces,
//     });
//   } catch (err) {
//     console.error(`Error in getAllSpaces: ${err.message}`, err.stack);
//     res.status(500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: 500,
//       },
//     });
//   }
// };

// const getSpace = async (req, res) => {
//   try {
//     const { spaceId } = req.params;
//     if (!spaceId.match(/^[0-9a-fA-F]{24}$/)) throw new BadRequestError('Invalid space ID');

//     const space = await Space.findById(spaceId).populate('owner', 'name email');
//     if (!space) throw new BadRequestError('Space not found');

//     res.status(200).json({
//       status: 'success',
//       data: space,
//     });
//   } catch (err) {
//     console.error(`Error in getSpace: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

// const getPendingSpaces = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) throw new UnauthorizedError('User not authenticated');
//     const user = await User.findById(userId);
//     if (!user || user.role !== 'admin') throw new UnauthorizedError('Only admins can view pending spaces');

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const pendingSpaces = await Space.find({ status: 'pending' })
//       .populate('owner', 'email name')
//       .skip(skip)
//       .limit(limit)
//       .select('_id name type managerName phone address city pincode price listingType photos status ageGroupMix');

//     const total = await Space.countDocuments({ status: 'pending' });

//     res.status(200).json({
//       status: 'success',
//       data: {
//         spaces: pendingSpaces,
//         pagination: { total, page, pages: Math.ceil(total / limit), limit },
//       },
//     });
//   } catch (err) {
//     console.error(`Error in getPendingSpaces: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: { message: err.message || 'Internal server error', status: err.statusCode || 500 },
//     });
//   }
// };

// const manageSpaceStatus = async (req, res) => {
//   try {
//     const { spaceId, action } = req.body;
//     const userId = req.user?.id;

//     if (!userId) throw new UnauthorizedError('User not authenticated');
//     const user = await User.findById(userId);
//     if (!user || user.role !== 'admin') throw new UnauthorizedError('Only admins can manage space status');

//     if (!spaceId || !action) throw new BadRequestError('Space ID and action are required');
//     if (!['approve', 'reject'].includes(action)) throw new BadRequestError('Action must be "approve" or "reject"');

//     const space = await Space.findById(spaceId);
//     if (!space) throw new BadRequestError('Space not found');
//     if (space.status !== 'pending') throw new BadRequestError('Space is already processed');

//     space.status = action === 'approve' ? 'approved' : 'rejected';
//     await space.save();

//     res.status(200).json({
//       status: 'success',
//       message: `Space ${action}ed successfully`,
//       data: { space },
//     });
//   } catch (err) {
//     console.error(`Error in manageSpaceStatus: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: { message: err.message || 'Internal server error', status: err.statusCode || 500 },
//     });
//   }
// };

// export { createSpace, updateUserAccount, getAllSpaces, getSpace, getPendingSpaces, manageSpaceStatus };



//part 3 final import Space from '../models/Space.js';
// import User from '../../user/models/User.js';
// import { uploadImageBase64 } from '../../../integrations/cloudinary/cloudinary.config.js';
// import { BadRequestError, UnauthorizedError, ForbiddenError } from '../../../common/error/index.js';

// const createSpace = async (req, res) => {
//   try {
//     console.log('Received request body:', req.body);

//     const {
//       name, type, managerName, phone, email, address, city, pincode, landmark,
//       location, weekdayFootfall, weekendFootfall, brandingAreaSize, hasCCTV,
//       cameraCount, cameraAligned, complianceDetails, heatMapping, listingType,
//       preferredTiming, photos, price, agentId, bankDetails, ageGroupMix,
//     } = req.body;
//     const userId = req.user?.id;

//     if (!userId) throw new UnauthorizedError('User not authenticated');

//     const user = await User.findById(userId);
//     if (!user) throw new UnauthorizedError('User not found');
//     if (user.role !== 'space_owner') throw new ForbiddenError('Only Space Owners can register spaces');

//     if (!name || !type || !managerName || !phone || !address || !city || !pincode || !price) {
//       throw new BadRequestError('Name, type, manager name, phone, address, city, pincode, and price are required');
//     }

//     const validSpaceTypes = ['RWA', 'Mall', 'Retail', 'Cafe', 'store', 'salon', 'gym', 'other'];
//     if (!validSpaceTypes.includes(type)) throw new BadRequestError('Invalid space type');

//     if (hasCCTV === 'yes' && (!cameraCount || !cameraAligned)) {
//       throw new BadRequestError('Camera count and alignment are required if CCTV is present');
//     }

//     if (!location || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
//       throw new BadRequestError('Valid location coordinates (longitude, latitude) are required');
//     }

//     const existingSpace = await Space.findOne({ name, owner: userId });
//     if (existingSpace) throw new BadRequestError('A space with this name already exists for this user');

//     const isFirstSpace = !user.spaces || user.spaces.length === 0;

//     if (isFirstSpace && (!bankDetails || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName)) {
//       throw new BadRequestError('All bank details are required for your first space');
//     }

//     if (!photos || !Array.isArray(photos) || photos.length === 0) {
//       throw new BadRequestError('At least one photo is required');
//     }

//     const uploadedPhotos = await Promise.all(
//       photos.map(async (photoBase64) => {
//         if (photoBase64 && typeof photoBase64 === 'string' && photoBase64.startsWith('data:image/')) {
//           return await uploadImageBase64(photoBase64, 'blookmyspace1/spaces');
//         }
//         return null;
//       })
//     );
//     const filteredPhotos = uploadedPhotos.filter(url => url);
//     if (filteredPhotos.length === 0) throw new BadRequestError('At least one valid photo is required');

//     const space = await Space.create({
//       owner: userId,
//       name,
//       type,
//       managerName,
//       phone,
//       email,
//       address,
//       city,
//       pincode,
//       landmark,
//       location: {
//         type: 'Point',
//         coordinates: [parseFloat(location.coordinates[0]), parseFloat(location.coordinates[1])],
//       },
//       weekdayFootfall: weekdayFootfall ? Number(weekdayFootfall) : undefined,
//       weekendFootfall: weekendFootfall ? Number(weekendFootfall) : undefined,
//       brandingAreaSize,
//       hasCCTV,
//       cameraCount: cameraCount ? Number(cameraCount) : undefined,
//       cameraAligned,
//       complianceDetails: complianceDetails || {},
//       heatMapping,
//       listingType: listingType || 'free',
//       preferredTiming,
//       photos: filteredPhotos,
//       price: Number(price),
//       agentId,
//       ageGroupMix,
//       status: 'pending',
//     });

//     if (!user.spaces) user.spaces = [];
//     user.spaces.push(space._id);
//     user.spaceCount = user.spaces.length;

//     if (isFirstSpace && bankDetails) {
//       user.bankDetails = bankDetails;
//     }

//     await user.save();

//     res.status(201).json({
//       status: 'success',
//       message: 'Space registered',
//       data: { space },
//     });
//   } catch (err) {
//     console.error(`Error in createSpace: ${err.message}`, {
//       stack: err.stack,
//       requestBody: req.body,
//       userId: req.user?.id,
//     });
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

// const updateUserAccount = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     const { bankDetails } = req.body;

//     if (!userId) throw new UnauthorizedError('User not authenticated');

//     const user = await User.findById(userId);
//     if (!user) throw new UnauthorizedError('User not found');

//     if (!bankDetails || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName) {
//       throw new BadRequestError('All bank details are required');
//     }

//     user.bankDetails = bankDetails;
//     await user.save();

//     res.status(200).json({
//       status: 'success',
//       message: 'Bank details updated successfully',
//       data: { bankDetails: user.bankDetails },
//     });
//   } catch (err) {
//     console.error(`Error in updateUserAccount: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

// const getAllSpaces = async (req, res) => {
//   try {
//     const { searchQuery, city, type, minPrice, maxPrice, weekdayFootfallMin, weekdayFootfallMax, ageGroupMix } = req.query;
//     const query = { status: 'approved' };

//     if (searchQuery) {
//       query.$or = [
//         { name: { $regex: searchQuery, $options: 'i' } },
//         { address: { $regex: searchQuery, $options: 'i' } },
//         { city: { $regex: searchQuery, $options: 'i' } },
//       ];
//     }

//     if (city) query.city = { $regex: city, $options: 'i' };
//     if (type) query.type = { $in: type.split(',') };
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }
//     if (weekdayFootfallMin || weekdayFootfallMax) {
//       query.weekdayFootfall = {};
//       if (weekdayFootfallMin) query.weekdayFootfall.$gte = Number(weekdayFootfallMin);
//       if (weekdayFootfallMax) query.weekdayFootfall.$lte = Number(weekdayFootfallMax);
//     }
//     if (ageGroupMix) {
//       query.ageGroupMix = { $regex: ageGroupMix, $options: 'i' };
//     }

//     const spaces = await Space.find(query)
//       .populate('owner', 'name email')
//       .select('name type city price photos listingType ageGroupMix weekdayFootfall weekendFootfall');
    
//     res.status(200).json({
//       status: 'success',
//       data: spaces,
//     });
//   } catch (err) {
//     console.error(`Error in getAllSpaces: ${err.message}`, err.stack);
//     res.status(500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: 500,
//       },
//     });
//   }
// };

// const getSpace = async (req, res) => {
//   try {
//     const { spaceId } = req.params;
//     if (!spaceId.match(/^[0-9a-fA-F]{24}$/)) throw new BadRequestError('Invalid space ID');

//     const space = await Space.findById(spaceId).populate('owner', 'name email');
//     if (!space) throw new BadRequestError('Space not found');

//     res.status(200).json({
//       status: 'success',
//       data: space,
//     });
//   } catch (err) {
//     console.error(`Error in getSpace: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

// const getPendingSpaces = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) throw new UnauthorizedError('User not authenticated');
//     const user = await User.findById(userId);
//     if (!user || user.role !== 'admin') throw new ForbiddenError('Only admins can view pending spaces');

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const pendingSpaces = await Space.find({ status: 'pending' })
//       .populate('owner', 'email name')
//       .skip(skip)
//       .limit(limit)
//       .select('_id name type managerName phone address city pincode price listingType photos status ageGroupMix');

//     const total = await Space.countDocuments({ status: 'pending' });

//     res.status(200).json({
//       status: 'success',
//       data: {
//         spaces: pendingSpaces,
//         pagination: { total, page, pages: Math.ceil(total / limit), limit },
//       },
//     });
//   } catch (err) {
//     console.error(`Error in getPendingSpaces: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: { message: err.message || 'Internal server error', status: err.statusCode || 500 },
//     });
//   }
// };

// const manageSpaceStatus = async (req, res) => {
//   try {
//     const { spaceId, action } = req.body;
//     const userId = req.user?.id;

//     if (!userId) throw new UnauthorizedError('User not authenticated');
//     const user = await User.findById(userId);
//     if (!user || user.role !== 'admin') throw new ForbiddenError('Only admins can manage space status');

//     if (!spaceId || !action) throw new BadRequestError('Space ID and action are required');
//     if (!['approve', 'reject'].includes(action)) throw new BadRequestError('Action must be "approve" or "reject"');

//     const space = await Space.findById(spaceId);
//     if (!space) throw new BadRequestError('Space not found');
//     if (space.status !== 'pending') throw new BadRequestError('Space is already processed');

//     space.status = action === 'approve' ? 'approved' : 'rejected';
//     await space.save();

//     res.status(200).json({
//       status: 'success',
//       message: `Space ${action}ed successfully`,
//       data: { space },
//     });
//   } catch (err) {
//     console.error(`Error in manageSpaceStatus: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: { message: err.message || 'Internal server error', status: err.statusCode || 500 },
//     });
//   }
// };

// export { createSpace, updateUserAccount, getAllSpaces, getSpace, getPendingSpaces, manageSpaceStatus };

import Space from '../model/Space.js';
import User from '../../user/models/User.js';
import mongoose from 'mongoose';
import Availability from '../../calender/model/availablitymodel.js';
import { uploadImageBase64 } from '../../../integrations/cloudinary/cloudinary.config.js';
import { BadRequestError, UnauthorizedError, ForbiddenError } from '../../../common/error/index.js';

// const createSpace = async (req, res) => {
//   try {
//     console.log('Received request body:', req.body);

//     const {
//       name, type, managerName, phone, email, address, city, pincode, landmark,
//       location, weekdayFootfall, weekendFootfall, brandingAreaSize, hasCCTV,
//       cameraCount, cameraAligned, complianceDetails, heatMapping, listingType,
//       preferredTiming, photos, price, agentId, bankDetails, ageGroupMix, availabilities,
//     } = req.body;
//     const userId = req.user?.id;

//     if (!userId) throw new UnauthorizedError('User not authenticated');

//     const user = await User.findById(userId);
//     if (!user) throw new UnauthorizedError('User not found');
//     if (user.role !== 'space_owner') throw new ForbiddenError('Only Space Owners can register spaces');

//     if (!name || !type || !managerName || !phone || !address || !city || !pincode || !price) {
//       throw new BadRequestError('Name, type, manager name, phone, address, city, pincode, and price are required');
//     }

//     const validSpaceTypes = ['RWA', 'Mall', 'Retail', 'Cafe', 'store', 'salon', 'gym', 'other'];
//     if (!validSpaceTypes.includes(type)) throw new BadRequestError('Invalid space type');

//     if (hasCCTV === 'yes' && (!cameraCount || !cameraAligned)) {
//       throw new BadRequestError('Camera count and alignment are required if CCTV is present');
//     }

//     if (!location || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
//       throw new BadRequestError('Valid location coordinates (longitude, latitude) are required');
//     }

//     const existingSpace = await Space.findOne({ name, owner: userId });
//     if (existingSpace) throw new BadRequestError('A space with this name already exists for this user');

//     const isFirstSpace = !user.spaces || user.spaces.length === 0;

//     if (isFirstSpace && (!bankDetails || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName)) {
//       throw new BadRequestError('All bank details are required for your first space');
//     }

//     if (!photos || !Array.isArray(photos) || photos.length === 0) {
//       throw new BadRequestError('At least one photo is required');
//     }

//     const uploadedPhotos = await Promise.all(
//       photos.map(async (photoBase64) => {
//         if (photoBase64 && typeof photoBase64 === 'string' && photoBase64.startsWith('data:image/')) {
//           return await uploadImageBase64(photoBase64, 'blookmyspace1/spaces');
//         }
//         return null;
//       })
//     );
//     const filteredPhotos = uploadedPhotos.filter(url => url);
//     if (filteredPhotos.length === 0) throw new BadRequestError('At least one valid photo is required');

//     const space = new Space({
//       owner: userId,
//       name,
//       type,
//       managerName,
//       phone,
//       email,
//       address,
//       city,
//       pincode,
//       landmark,
//       location: {
//         type: 'Point',
//         coordinates: [parseFloat(location.coordinates[0]), parseFloat(location.coordinates[1])],
//       },
//       weekdayFootfall: weekdayFootfall ? Number(weekdayFootfall) : undefined,
//       weekendFootfall: weekendFootfall ? Number(weekendFootfall) : undefined,
//       brandingAreaSize,
//       hasCCTV,
//       cameraCount: cameraCount ? Number(cameraCount) : undefined,
//       cameraAligned,
//       complianceDetails: complianceDetails || {},
//       heatMapping,
//       listingType: listingType || 'free',
//       preferredTiming,
//       photos: filteredPhotos,
//       price: Number(price),
//       agentId,
//       ageGroupMix,
//       availability: [],
//     });

//     // Save initial availabilities
//     if (availabilities && Array.isArray(availabilities) && availabilities.length > 0) {
//       for (const avail of availabilities) {
//         if (avail.startDate && avail.endDate) {
//           const availability = await Availability.create({
//             spaceId: space._id,
//             startDate: new Date(avail.startDate),
//             endDate: new Date(avail.endDate),
//             price: avail.price ? Number(avail.price) : undefined,
//           });
//           space.availability.push(availability._id);
//         }
//       }
//     }

//     await space.save();

//     if (!user.spaces) user.spaces = [];
//     user.spaces.push(space._id);
//     user.spaceCount = user.spaces.length;

//     if (isFirstSpace && bankDetails) {
//       user.bankDetails = bankDetails;
//     }

//     await user.save();

//     res.status(201).json({
//       status: 'success',
//       message: 'Space registered',
//       data: { space },
//     });
//   } catch (err) {
//     console.error(`Error in createSpace: ${err.message}`, {
//       stack: err.stack,
//       requestBody: req.body,
//       userId: req.user?.id,
//     });
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };


const createSpace = async (req, res) => {
  try {
    const {
      name,
      type,
      managerName,
      phone,
      email,
      address,
      city,
      pincode,
      landmark,
      location,
      weekdayFootfall,
      weekendFootfall,
      brandingAreaSize,
      hasCCTV,
      cameraCount,
      cameraAligned,
      complianceDetails,
      heatMapping,
      listingType,
      preferredTiming,
      photos,
      price,
      agentId,
      bankDetails,
      ageGroupMix,
      availabilities,
    } = req.body;

    let userId = req.user?.id;
    console.log('createSpace: userId:', userId, 'spaceData:', JSON.stringify(req.body, null, 2)); // Detailed debug

    if (!userId) {
      console.error('createSpace: No userId provided');
      throw new UnauthorizedError('User not authenticated');
    }

    if (!name || !type || !managerName || !phone || !address || !city || !pincode || !price) {
      console.error('createSpace: Missing required fields:', { name, type, managerName, phone, address, city, pincode, price });
      throw new BadRequestError('Missing required fields');
    }

    if (!location?.coordinates || location.coordinates.length !== 2) {
      console.error('createSpace: Invalid location coordinates:', location);
      throw new BadRequestError('Invalid location coordinates');
    }

    if (typeof userId !== 'string' && mongoose.Types.ObjectId.isValid(userId)) {
      userId = userId.toString();
    }

    const space = await Space.create({
      name,
      type,
      managerName,
      phone,
      email,
      address,
      city,
      pincode,
      landmark,
      location: {
        type: 'Point',
        coordinates: [parseFloat(location.coordinates[0]), parseFloat(location.coordinates[1])],
      },
      weekdayFootfall: weekdayFootfall ? Number(weekdayFootfall) : undefined,
      weekendFootfall: weekendFootfall ? Number(weekendFootfall) : undefined,
      brandingAreaSize,
      hasCCTV,
      cameraCount: cameraCount ? Number(cameraCount) : undefined,
      cameraAligned,
      complianceDetails: {
        panNumber: complianceDetails?.panNumber,
        gstNumber: complianceDetails?.gstNumber,
      },
      heatMapping,
      listingType: listingType || 'free',
      preferredTiming,
      photos: photos && Array.isArray(photos) ? photos : [],
      price: Number(price),
      owner: userId,
      agentId: agentId && mongoose.Types.ObjectId.isValid(agentId) ? agentId : undefined,
      bankDetails: bankDetails || undefined,
      ageGroupMix,
      availabilities: availabilities && Array.isArray(availabilities) ? availabilities : [],
      priorityLevel: listingType === 'premium' ? 1 : 0,
    });

    console.log('Space created successfully: spaceId=', space._id, 'name=', space.name); // Debug

    res.status(201).json({
      status: 'success',
      message: 'Space created successfully',
      data: space,
    });
  } catch (err) {
    console.error('Error in createSpace:', err.message, err.stack);
    res.status(err.statusCode || 400).json({
      error: {
        message: err.message || 'Failed to create space',
        status: err.statusCode || 400,
      },
    });
  }
};

const updateUserAccount = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { bankDetails } = req.body;

    if (!userId) throw new UnauthorizedError('User not authenticated');

    const user = await User.findById(userId);
    if (!user) throw new UnauthorizedError('User not found');

    if (!bankDetails || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName) {
      throw new BadRequestError('All bank details are required');
    }

    user.bankDetails = bankDetails;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Bank details updated successfully',
      data: { bankDetails: user.bankDetails },
    });
  } catch (err) {
    console.error(`Error in updateUserAccount: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

const getAllSpaces = async (req, res) => {
  try {
    console.log('getAllSpaces called with query:', req.query);

    if (!Space) {
      throw new Error('Space model is not defined');
    }

    const { searchQuery, city, type, minPrice, maxPrice, weekdayFootfallMin, weekdayFootfallMax, ageGroupMix } = req.query;
    const query = { status: 'approved' };

    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { address: { $regex: searchQuery, $options: 'i' } },
        { city: { $regex: searchQuery, $options: 'i' } },
      ];
    }

    if (city) query.city = { $regex: city, $options: 'i' };
    if (type) {
      const types = type.split(',').map(t => t.trim()).filter(t => t);
      if (types.length > 0) query.type = { $in: types };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (weekdayFootfallMin || weekdayFootfallMax) {
      query.weekdayFootfall = {};
      if (weekdayFootfallMin) query.weekdayFootfall.$gte = Number(weekdayFootfallMin);
      if (weekdayFootfallMax) query.weekdayFootfall.$lte = Number(weekdayFootfallMax);
    }
    if (ageGroupMix) {
      query.ageGroupMix = { $regex: ageGroupMix, $options: 'i' };
    }

    console.log('Query constructed:', query);

    const spaces = await Space.find(query)
      .populate('owner', 'name email')
      .populate('availability')
      .select('name type city price photos listingType ageGroupMix weekdayFootfall weekendFootfall availability')
      .lean();

    console.log('Fetched spaces:', spaces.length, spaces);

    res.status(200).json({
      status: 'success',
      data: spaces,
    });
  } catch (err) {
    console.error(`Error in getAllSpaces: ${err.message}`, {
      stack: err.stack,
      query: req.query,
    });
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

const getSpace = async (req, res) => {
  try {
    const { spaceId } = req.params;
    if (!spaceId.match(/^[0-9a-fA-F]{24}$/)) throw new BadRequestError('Invalid space ID');

    const space = await Space.findById(spaceId)
      .populate('owner', 'name email')
      .populate('availability');
    if (!space) throw new BadRequestError('Space not found');

    res.status(200).json({
      status: 'success',
      data: space,
    });
  } catch (err) {
    console.error(`Error in getSpace: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

const getPendingSpaces = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedError('User not authenticated');
    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') throw new ForbiddenError('Only admins can view pending spaces');

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const pendingSpaces = await Space.find({ status: 'pending' })
      .populate('owner', 'email name')
      .skip(skip)
      .limit(limit)
      .select('_id name type managerName phone address city pincode price listingType photos status ageGroupMix availability');

    const total = await Space.countDocuments({ status: 'pending' });

    res.status(200).json({
      status: 'success',
      data: {
        spaces: pendingSpaces,
        pagination: { total, page, pages: Math.ceil(total / limit), limit },
      },
    });
  } catch (err) {
    console.error(`Error in getPendingSpaces: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: { message: err.message || 'Internal server error', status: err.statusCode || 500 },
    });
  }
};

const manageSpaceStatus = async (req, res) => {
  try {
    const { spaceId, action } = req.body;
    const userId = req.user?.id;

    if (!userId) throw new UnauthorizedError('User not authenticated');
    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') throw new ForbiddenError('Only admins can manage space status');

    if (!spaceId || !action) throw new BadRequestError('Space ID and action are required');
    if (!['approve', 'reject'].includes(action)) throw new BadRequestError('Action must be "approve" or "reject"');

    const space = await Space.findById(spaceId);
    if (!space) throw new BadRequestError('Space not found');
    if (space.status !== 'pending') throw new BadRequestError('Space is already processed');

    space.status = action === 'approve' ? 'approved' : 'rejected';
    await space.save();

    res.status(200).json({
      status: 'success',
      message: `Space ${action}ed successfully`,
      data: { space },
    });
  } catch (err) {
    console.error(`Error in manageSpaceStatus: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: { message: err.message || 'Internal server error', status: err.statusCode || 500 },
    });
  }
};
const getOwnerSpaces = async (req, res) => {
  try {
    const userId = req.user?.id;
    console.log('Fetching spaces for user:', userId); // Debug

    if (!userId) throw new UnauthorizedError('User not authenticated');

    const user = await User.findById(userId);
    if (!user || user.role !== 'space_owner') {
      throw new ForbiddenError('Only space owners can view their spaces');
    }

    const spaces = await Space.find({ owner: userId })
      .select('name type city price photos listingType ageGroupMix weekdayFootfall weekendFootfall status')
      .lean();

    console.log('Fetched owner spaces:', spaces); // Debug

    res.status(200).json({
      status: 'success',
      data: spaces,
    });
  } catch (err) {
    console.error(`Error in getOwnerSpaces: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

export { createSpace, updateUserAccount, getAllSpaces, getSpace, getPendingSpaces, manageSpaceStatus ,getOwnerSpaces};