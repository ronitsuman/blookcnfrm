
// import User from '../models/User.js';
// import { uploadImageBase64 } from '../../../integrations/cloudinary/cloudinary.config.js';
// import { sendEmail } from '../../../integrations/email/email.service.js';
// import { BadRequestError } from '../../../common/error/index.js';


// const getMe = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) {
//       throw new UnauthorizedError('User not authenticated');
//     }

//     const user = await User.findById(userId).select('-password'); // Exclude password
//     if (!user) {
//       throw new UnauthorizedError('User not found');
//     }

//     res.status(200).json({
//       status: 'success',
//       data: {
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           spaces: user.spaces,
//           spaceCount: user.spaceCount,
//           bankDetails: user.bankDetails,
//         },
//       },
//     });
//   } catch (err) {
//     res.status(err.statusCode || 500).json({
//       error: {
//         message: err.message || 'Internal server error',
//         status: err.statusCode || 500,
//       },
//     });
//   }
// };

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
//      console.log(role, 'role');
//     // Validate payment-related roles (require bank details during signup, except for space_owner)
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
//       bankDetails: ['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(role) ? bankDetails : null, // Space Owners won't have bankDetails at signup
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

// export { createUser , getMe};



//part 2 final 
import User from '../models/User.js';
import { uploadImageBase64 } from '../../../integrations/cloudinary/cloudinary.config.js';
import { sendEmail } from '../../../integrations/email/email.service.js';
import { BadRequestError, UnauthorizedError } from '../../../common/error/index.js';
import generateToken from '../../user/helper/generateToken.js';

const getMe = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError('User not authenticated');
    }

    const user = await User.findById(userId).select('-password');
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
    const {
      name, email, phone, role, password, city, address, pincode, occupation,
      workingHours, dateOfBirth, referredBy, companyName, onboardingTarget,
      bankDetails, idProofBase64, selfieWithIdBase64, notificationPreferences,
      roleSpecificData, location
    } = req.body;

    console.log('Received signup data:', JSON.stringify(req.body, null, 2)); // Debug log

    // Validate required fields
    if (!name || !email || !phone || !role || !password ) {
      throw new BadRequestError('Name, email, phone, role, password, and date of birth are required');
    }

    // Validate payment-related roles
    if (['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(role)) {
      if (!bankDetails || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName || !bankDetails.accountHolderName) {
        throw new BadRequestError('All bank details are required for this role');
      }
    }

    // Validate BLookForce agent requirements
    if (role === 'blookforce_agent') {
      const errors = [];
      if (!address?.street) errors.push('Street address is required');
      if (!address?.city) errors.push('City is required');
      if (!address?.pincode) errors.push('Pincode is required');
      if (!occupation) errors.push('Occupation is required');
      if (!workingHours) errors.push('Working hours are required');
      if (!idProofBase64 || !idProofBase64.startsWith('data:image/')) errors.push('Valid ID proof is required');
      if (!selfieWithIdBase64 || !selfieWithIdBase64.startsWith('data:image/')) errors.push('Valid selfie with ID is required');

      if (errors.length > 0) {
        throw new BadRequestError(`Missing or invalid fields: ${errors.join(', ')}`);
      }
    }

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      throw new BadRequestError(existingUser.email === email ? 'Email already registered' : 'Phone already registered');
    }

    // Upload ID proof and selfie to Cloudinary
    let idProofUrl = null, selfieWithIdUrl = null;
    if (idProofBase64 && idProofBase64.startsWith('data:image/')) {
      idProofUrl = await uploadImageBase64(idProofBase64, 'blookmyspace/compliance');
    }
    if (selfieWithIdBase64 && selfieWithIdBase64.startsWith('data:image/')) {
      selfieWithIdUrl = await uploadImageBase64(selfieWithIdBase64, 'blookmyspace/compliance');
    }

    // Generate BLookForce code
    const blookforceCode = ['blookforce_agent', 'telecaller'].includes(role)
      ? `BFS-${address?.city?.substring(0, 3).toUpperCase() || 'AG'}-${Math.floor(1000 + Math.random() * 9000)}`
      : undefined;

    // Handle location
    let locationData = null;
    if (location && location.coordinates && location.coordinates.length === 2) {
      locationData = {
        type: 'Point',
        coordinates: [parseFloat(location.coordinates[0]), parseFloat(location.coordinates[1])],
      };
    }

    // Ensure resume is set to empty string if not provided
    if (role === 'blookforce_agent' && roleSpecificData?.blookforce_agent) {
      roleSpecificData.blookforce_agent.resume = roleSpecificData.blookforce_agent.resume || '';
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      role,
      password,
      city: address?.city, // Use address.city
      address,
      pincode: address?.pincode, // Use address.pincode
      occupation,
      workingHours,
      dateOfBirth,
      referredBy,
      companyName,
      onboardingTarget,
      bankDetails: ['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(role) ? bankDetails : null,
      complianceDocs: { idProof: idProofUrl, selfieWithId: selfieWithIdUrl },
      notificationPreferences,
      roleSpecificData: roleSpecificData || {},
      blookforceCode,
      // status: role === 'admin' ? 'approved' : 'pending',
      location: locationData,
    });

    // Send welcome email
    try {
      await sendEmail({
        to: email,
        subject: 'Welcome to BLookMySpace!',
        text: blookforceCode ? `Welcome! Your Code: ${blookforceCode}` : 'Thanks for joining our platform!',
      });
    } catch (emailErr) {
      console.error(`Failed to send welcome email to ${email}: ${emailErr.message}`);
    }

    // Generate JWT
    const token = generateToken(user);

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name,
          email,
          role,
          blookforceCode: user.blookforceCode || null,
          status: user.status,
        },
        token,
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

export { createUser, getMe };