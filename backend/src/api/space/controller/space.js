// src/api/space/controllers/spaceController.js
import Space from '../model/Space.js';
import User from '../../user/models/User.js';
import { uploadImageBase64 } from '../../../integrations/cloudinary/cloudinary.config.js';
import { BadRequestError, UnauthorizedError } from '../../../common/error/index.js';

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
      } = req.body;
      const userId = req.user?.id;
  
      // Validate userId
      if (!userId) {
        throw new UnauthorizedError('User not authenticated');
      }
  
      // Fetch user from database
      const user = await User.findById(userId);
      if (!user) {
        throw new UnauthorizedError('User not found');
      }
  
      // Validate user role
      if (user.role !== 'space_owner') {
        throw new UnauthorizedError('Only Space Owners can register spaces');
      }
  
      // Validate required fields
      if (!name || !type || !managerName || !phone || !address || !city || !pincode || !price) {
        throw new BadRequestError('Name, type, manager name, phone, address, city, pincode, and price are required');
      }
  
      const validSpaceTypes = ['RWA', 'Mall', 'Retail', 'Cafe', 'store', 'salon', 'gym', 'other'];
      if (!validSpaceTypes.includes(type)) {
        throw new BadRequestError('Invalid space type');
      }
  
      // If hasCCTV is 'yes', cameraCount and cameraAligned are required
      if (hasCCTV === 'yes') {
        if (!cameraCount || !cameraAligned) {
          throw new BadRequestError('Camera count and alignment are required if CCTV is present');
        }
      }
  
      // Validate location coordinates
      if (!location || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
        throw new BadRequestError('Valid location coordinates (longitude, latitude) are required');
      }
  
      // Check if this is the user's first space
      if (!Array.isArray(user.spaces)) {
        user.spaces = [];
      }
      const isFirstSpace = user.spaces.length === 0;
  
      // If first space, bankDetails are required
      let bankDetails = req.body.bankDetails;
      if (isFirstSpace) {
        if (!bankDetails || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName) {
          throw new BadRequestError('All bank details (account number, IFSC code, bank name, account holder name) are required for your first space');
        }
      }
  
      // Validate and upload photos (at least one photo required for exterior)
      if (!photos || !Array.isArray(photos) || photos.length === 0) {
        throw new BadRequestError('At least one exterior photo is required');
      }
  
      const uploadedPhotos = await Promise.all(
        photos.map(async (photoBase64) => {
          if (photoBase64) {
            return await uploadImageBase64(photoBase64, 'blookmyspace1/spaces');
          }
          return null;
        })
      );
      const filteredPhotos = uploadedPhotos.filter(url => url);
  
      // Create new space
      const space = await Space.create({
        owner: userId,
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
          coordinates: location.coordinates,
        },
        weekdayFootfall: weekdayFootfall ? Number(weekdayFootfall) : undefined,
        weekendFootfall: weekendFootfall ? Number(weekendFootfall) : undefined,
        brandingAreaSize,
        hasCCTV,
        cameraCount: cameraCount ? Number(cameraCount) : undefined,
        cameraAligned,
        complianceDetails: complianceDetails || {},
        heatMapping,
        listingType: listingType || 'free',
        preferredTiming,
        photos: filteredPhotos,
        price: Number(price),
        agentId,
      });
  
      // Update user's spaces and spaceCount
      user.spaces.push(space._id);
      user.spaceCount = user.spaces.length; // No need for additional check since spaceCount is now defaulted in schema
  
      if (isFirstSpace && bankDetails) {
        user.bankDetails = bankDetails;
      }
  
      await user.save();
  
      res.status(201).json({
        status: 'success',
        message: 'Space registered',
        data: {
          space: {
            id: space._id,
            name: space.name,
            type: space.type,
            managerName: space.managerName,
            phone: space.phone,
            email: space.email,
            address: space.address,
            city: space.city,
            pincode: space.pincode,
            landmark: space.landmark,
            location: space.location,
            weekdayFootfall: space.weekdayFootfall,
            weekendFootfall: space.weekendFootfall,
            brandingAreaSize: space.brandingAreaSize,
            hasCCTV: space.hasCCTV,
            cameraCount: space.cameraCount,
            cameraAligned: space.cameraAligned,
            complianceDetails: space.complianceDetails,
            heatMapping: space.heatMapping,
            listingType: space.listingType,
            preferredTiming: space.preferredTiming,
            photos: space.photos,
            price: space.price,
            status: space.status,
            agentId: space.agentId,
          },
        },
      });
    } catch (err) {
      console.error(`Error in createSpace: ${err.message}`, err.stack);
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
    const {
      searchQuery,
      city,
      type,
      minPrice,
      maxPrice,
      weekdayFootfallMin,
      weekdayFootfallMax,
    } = req.query;

    const query = { status: 'approved' };

    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { address: { $regex: searchQuery, $options: 'i' } },
        { city: { $regex: searchQuery, $options: 'i' } },
      ];
    }

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    if (type) {
      const types = type.split(',');
      query.type = { $in: types };
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

    const spaces = await Space.find(query);
    res.status(200).json({
      status: 'success',
      data: spaces,
    });
  } catch (err) {
    console.error(`Error in getAllSpaces: ${err.message}`, err.stack);
    res.status(500).json({
      error: {
        message: err.message || 'Internal server error',
        status: 500,
      },
    });
  }
};

const getSpace = async (req, res) => {
  try {
    const { spaceId } = req.params;

    // Validate space ID format
    if (!spaceId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError('Invalid space ID');
    }

    const space = await Space.findById(spaceId);
    if (!space) {
      throw new BadRequestError('Space not found');
    }

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


const createSubscription = async (req, res) => {
  try {
    const { spaceId, plan, agentId } = req.body;
    const userId = req.user?.id;

    // Validate user
    if (!userId) {
      throw new UnauthorizedError('User not authenticated');
    }

    // Validate required fields
    if (!spaceId || !plan || !agentId) {
      throw new BadRequestError('Space ID, plan, and agent ID are required');
    }

    // Validate space
    const space = await Space.findById(spaceId);
    if (!space) {
      throw new BadRequestError('Space not found');
    }

    // Validate plan
    const validPlans = ['free', 'premium'];
    if (!validPlans.includes(plan)) {
      throw new BadRequestError('Invalid plan type');
    }

    // Create subscription
    const subscription = await Subscription.create({
      spaceId,
      plan,
      agentId,
      status: 'active',
    });

    res.status(201).json({
      status: 'success',
      message: 'Subscription created successfully',
      data: {
        subscription: {
          id: subscription._id,
          spaceId: subscription.spaceId,
          plan: subscription.plan,
          agentId: subscription.agentId,
          status: subscription.status,
        },
      },
    });
  } catch (err) {
    console.error(`Error in createSubscription: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

export { createSpace, getAllSpaces, getSpace ,createSubscription };