// // src/api/user/controllers/userController.js
// import User from '../models/User.js';
// import { geocodeAddress } from '../../../integrations/google-maps/google-maps.config.js';
// import { uploadImage, uploadImageBase64 } from '../../../integrations/cloudinary/cloudinary.config.js';
// import { sendEmail } from '../../../integrations/email/email.service.js';
// import { BadRequestError } from '../../../common/error/index.js';

// const createUser = async (req, res) => {
//   try {
//     console.log('Received request body:', req.body);
//     console.log('Received files:', req.files);

//     const {
//       name, email, phone, role, password, city, address, pincode, occupation,
//       workingHours, dateOfBirth, referredBy, companyName, onboardingTarget,
//       bankDetails, idProofBase64,
//     } = req.body;
//     const { profilePhoto, idProof } = req.files || {};

//     // Validate required fields
//     if (!name || !email || !phone || !role || !password || !dateOfBirth || !bankDetails) {
//       throw new BadRequestError('Name, email, phone, role, password, date of birth, and bank details are required');
//     }

//     // Validate bank details
//     if (!bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName) {
//       throw new BadRequestError('All bank details (account number, IFSC code, bank name, account holder name) are required');
//     }

//     // Validate BlookForce Agent requirements
//     if (role === 'blookforce_agent') {
//       if (!address || !city || !pincode || !occupation || !workingHours) {
//         throw new BadRequestError('All BlookForce agent details (address, city, pincode, occupation, working hours) are required');
//       }
//       if (!idProof && !idProofBase64) {
//         throw new BadRequestError('ID proof is required for BlookForce Agent (either as a file or Base64 string)');
//       }
//     }

//     // Check for existing user
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       throw new BadRequestError('Email already registered');
//     }

//     // Geocode address if provided
//     let location = null;
//     // if (address && city) {
//     //   try {
//     //     console.log(`Geocoding address: ${address}, ${city}`);
//     //     location = await geocodeAddress(`${address}, ${city}`);
//     //     if (!location) throw new BadRequestError('Invalid address');
//     //   } catch (err) {
//     //     throw new BadRequestError(`Geocoding failed: ${err.message}`);
//     //   }
//     // }

//     // Upload files to Cloudinary
//     let profilePhotoUrl = null;
//     if (profilePhoto) {
//       if (!profilePhoto.mimetype.startsWith('image/')) {
//         throw new BadRequestError('Profile photo must be an image');
//       }
//       if (!profilePhoto.size || !profilePhoto.path) {
//         throw new BadRequestError('Profile photo file is invalid or empty');
//       }
//       console.log('Uploading profile photo to Cloudinary:', profilePhoto.name);
//       profilePhotoUrl = await uploadImage(profilePhoto, 'blookmyspace/users');
//     }

//     let idProofUrl = null;
//     if (idProof) {
//       if (!idProof.mimetype.startsWith('image/')) {
//         throw new BadRequestError('ID proof must be an image');
//       }
//       if (!idProof.size || !idProof.path) {
//         throw new BadRequestError('ID proof file is invalid or empty');
//       }
//       console.log('Uploading ID proof to Cloudinary (form-data):', idProof.name);
//       idProofUrl = await uploadImage(idProof, 'blookmyspace/compliance');
//     } else if (idProofBase64) {
//       console.log('Uploading ID proof to Cloudinary (Base64)');
//       idProofUrl = await uploadImageBase64(idProofBase64, 'blookmyspace/compliance');
//     }

//     // Generate BlookForce code
//     const blookforceCode = ['blookforce_agent', 'telecaller'].includes(role)
//       ? `BFS-${city?.substring(0, 3).toUpperCase() || 'AG'}-${Math.floor(1000 + Math.random() * 9000)}`
//       : null;

//     // Create user
//     console.log('Creating user in MongoDB');
//     const user = await User.create({
//       name,
//       email,
//       phone,
//       role,
//       password,
//       city,
//       address,
//       pincode,
//       occupation,
//       workingHours,
//       dateOfBirth,
//       referredBy,
//       companyName,
//       onboardingTarget,
//       bankDetails,
//       complianceDocs: { idProof: idProofUrl },
//       location: location ? { type: 'Point', coordinates: [location.lng, location.lat] } : null,
//       profilePhoto: profilePhotoUrl,
//       blookforceCode,
//     });

//     // Send welcome email
//     try {
//       console.log(`Sending welcome email to ${email}`);
//       await sendEmail({
//         to: email,
//         subject: 'Welcome to BLookMySpace!',
//         text: role === 'blookforce_agent'
//           ? `Welcome, BlookForce Agent! Your Code: ${blookforceCode}`
//           : 'Thanks for joining our platform!',
//       });
//     } catch (emailErr) {
//       console.error(`Failed to send welcome email to ${email}: ${emailErr.message}`);
//     }

//     res.status(201).json({
//       status: 'success',
//       data: {
//         user: {
//           id: user._id,
//           name,
//           email,
//           role,
//           blookforceCode,
//         },
//       },
//     });
//   } catch (err) {
//     console.error(`Error in createUser: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

// export { createUser };


// src/api/user/controllers/userController.js
// src/api/user/controllers/userController.js
// import User from '../models/User.js';
// import { uploadImageBase64 } from '../../../integrations/cloudinary/cloudinary.config.js';
// import { sendEmail } from '../../../integrations/email/email.service.js';
// import { BadRequestError } from '../../../common/error/index.js';

// const createUser = async (req, res) => {
//   try {
//     console.log('Content-Type received:', req.headers['content-type']);
//     console.log('Received request body:', req.body);

//     const {
//       name, email, phone, role, password, city, address, pincode, occupation,
//       workingHours, dateOfBirth, referredBy, companyName, onboardingTarget,
//       bankDetails, idProofBase64,
//     } = req.body;

//     // Validate required fields for ALL roles
//     if (!name || !email || !phone || !role || !password || !dateOfBirth) {
//       throw new BadRequestError('Name, email, phone, role, password, and date of birth are required');
//     }

//     // Validate payment-related roles (require bank details)
//     if (['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(role)) {
//       if (!bankDetails || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName) {
//         throw new BadRequestError('All bank details (account number, IFSC code, bank name, account holder name) are required for this role');
//       }
//     }

//     // Validate BlookForce Agent requirements
//     if (role === 'blookforce_agent') {
//       if (!address || !city || !pincode || !occupation || !workingHours) {
//         throw new BadRequestError('All BlookForce agent details (address, city, pincode, occupation, working hours) are required');
//       }
//       if (!idProofBase64) {
//         throw new BadRequestError('ID proof (Base64) is required for BlookForce Agent');
//       }
//     }

//     // Check for existing user
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       throw new BadRequestError('Email already registered');
//     }

//     // Temporarily skip geocoding
//     let location = null;

//     // Upload ID proof (Base64) to Cloudinary
//     let idProofUrl = null;
//     if (idProofBase64) {
//       console.log('Uploading ID proof to Cloudinary (Base64)');
//       idProofUrl = await uploadImageBase64(idProofBase64, 'blookmyspace/compliance');
//     }

//     // Generate BlookForce code
//     const blookforceCode = ['blookforce_agent', 'telecaller'].includes(role)
//       ? `BFS-${city?.substring(0, 3).toUpperCase() || 'AG'}-${Math.floor(1000 + Math.random() * 9000)}`
//       : undefined;

//     // Create user
//     console.log('Creating user in MongoDB');
//     const userData = {
//       name,
//       email,
//       phone,
//       role,
//       password,
//       city,
//       address,
//       pincode,
//       occupation,
//       workingHours,
//       dateOfBirth,
//       referredBy,
//       companyName,
//       onboardingTarget,
//       bankDetails: ['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(role) ? bankDetails : undefined,
//       complianceDocs: { idProof: idProofUrl },
//       location: location ? { type: 'Point', coordinates: [location.lng, location.lat] } : null,
//     };

//     if (blookforceCode) {
//       userData.blookforceCode = blookforceCode;
//     }

//     const user = await User.create(userData);

//     // Send welcome email
//     try {
//       console.log(`Sending welcome email to ${email}`);
//       await sendEmail({
//         to: email,
//         subject: 'Welcome to BLookMySpace!',
//         text: role === 'blookforce_agent' || role === 'telecaller'
//           ? `Welcome! Your Code: ${blookforceCode}`
//           : 'Thanks for joining our platform!',
//       });
//     } catch (emailErr) {
//       console.error(`Failed to send welcome email to ${email}: ${emailErr.message}`);
//     }

//     res.status(201).json({
//       status: 'success',
//       data: {
//         user: {
//           id: user._id,
//           name,
//           email,
//           role,
//           blookforceCode: user.blookforceCode || null,
//         },
//       },
//     });
//   } catch (err) {
//     console.error(`Error in createUser: ${err.message}`, err.stack);
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

// export { createUser }; 
// src/api/user/controllers/userController.js
import User from '../models/User.js';
import { uploadImageBase64 } from '../../../integrations/cloudinary/cloudinary.config.js';
import { sendEmail } from '../../../integrations/email/email.service.js';
import { BadRequestError } from '../../../common/error/index.js';


const getMe = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError('User not authenticated');
    }

    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          spaces: user.spaces,
          spaceCount: user.spaceCount,
          bankDetails: user.bankDetails,
        },
      },
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

const createUser = async (req, res) => {
  try {
    console.log('Content-Type received:', req.headers['content-type']);
    console.log('Received request body:', req.body);

    const {
      name, email, phone, role, password, city, address, pincode, occupation,
      workingHours, dateOfBirth, referredBy, companyName, onboardingTarget,
      bankDetails, idProofBase64,
    } = req.body;

    // Validate required fields for ALL roles
    if (!name || !email || !phone || !role || !password || !dateOfBirth) {
      throw new BadRequestError('Name, email, phone, role, password, and date of birth are required');
    }
     console.log(role, 'role');
    // Validate payment-related roles (require bank details during signup, except for space_owner)
    if (['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(role)) {
      if (!bankDetails || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName) {
        throw new BadRequestError('All bank details (account number, IFSC code, bank name, account holder name) are required for this role');
      }
    }

    // Validate BlookForce Agent requirements
    if (role === 'blookforce_agent') {
      if (!address || !city || !pincode || !occupation || !workingHours) {
        throw new BadRequestError('All BlookForce agent details (address, city, pincode, occupation, working hours) are required');
      }
      if (!idProofBase64) {
        throw new BadRequestError('ID proof (Base64) is required for BlookForce Agent');
      }
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email already registered');
    }

    // Temporarily skip geocoding
    let location = null;

    // Upload ID proof (Base64) to Cloudinary
    let idProofUrl = null;
    if (idProofBase64) {
      console.log('Uploading ID proof to Cloudinary (Base64)');
      idProofUrl = await uploadImageBase64(idProofBase64, 'blookmyspace/compliance');
    }

    // Generate BlookForce code
    const blookforceCode = ['blookforce_agent', 'telecaller'].includes(role)
      ? `BFS-${city?.substring(0, 3).toUpperCase() || 'AG'}-${Math.floor(1000 + Math.random() * 9000)}`
      : undefined;

    // Create user
    console.log('Creating user in MongoDB');
    const userData = {
      name,
      email,
      phone,
      role,
      password,
      city,
      address,
      pincode,
      occupation,
      workingHours,
      dateOfBirth,
      referredBy,
      companyName,
      onboardingTarget,
      bankDetails: ['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(role) ? bankDetails : null, // Space Owners won't have bankDetails at signup
      complianceDocs: { idProof: idProofUrl },
      location: location ? { type: 'Point', coordinates: [location.lng, location.lat] } : null,
    };

    if (blookforceCode) {
      userData.blookforceCode = blookforceCode;
    }

    const user = await User.create(userData);

    // Send welcome email
    try {
      console.log(`Sending welcome email to ${email}`);
      await sendEmail({
        to: email,
        subject: 'Welcome to BLookMySpace!',
        text: role === 'blookforce_agent' || role === 'telecaller'
          ? `Welcome! Your Code: ${blookforceCode}`
          : 'Thanks for joining our platform!',
      });
    } catch (emailErr) {
      console.error(`Failed to send welcome email to ${email}: ${emailErr.message}`);
    }

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name,
          email,
          role,
          blookforceCode: user.blookforceCode || null,
        },
      },
    });
  } catch (err) {
    console.error(`Error in createUser: ${err.message}`, err.stack);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal server error',
        status: err.statusCode || 500,
      },
    });
  }
};

export { createUser , getMe};