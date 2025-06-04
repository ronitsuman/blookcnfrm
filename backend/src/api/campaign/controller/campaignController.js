// // import Campaign from '../model/campaign.js';
// // import { v4 as uuidv4 } from 'uuid';
// // import { v2 as cloudinary } from 'cloudinary';

// // const uploadToCloudinary = (file) => {
// //   return new Promise((resolve, reject) => {
// //     const stream = cloudinary.uploader.upload_stream(
// //       { resource_type: 'auto' },
// //       (error, result) => {
// //         if (error) {
// //           reject(error);
// //         } else {
// //           resolve(result.secure_url);
// //         }
// //       }
// //     );
// //     stream.end(file.buffer);
// //   });
// // };

// // // Create Campaign
// // export const createCampaign = async (req, res) => {
// //   try {
// //     console.log('Request body:', req.body); // Debug log
// //     console.log('Request file:', req.file); // Debug log
// //     console.log('Request user:', req.user); // Debug log

// //     const { name, type, description, startDate, endDate, spaceId } = req.body;
// //     const user = req.user; // From auth middleware

// //     if (!user) {
// //       return res.status(401).json({ error: { message: 'User not authenticated' } });
// //     }

// //     const userId = user.id; // Use req.user.id instead of req.user._id
// //     console.log('User ID for campaign:', userId); // Debug log

// //     if (!spaceId) {
// //       return res.status(400).json({ error: { message: 'Space ID is required' } });
// //     }

// //     let mediaUrl = '';
// //     if (req.file) {
// //       mediaUrl = await uploadToCloudinary(req.file);
// //     }

// //     const qrCode = `qr_${uuidv4()}`; // Mock QR code value
// //     const campaign = new Campaign({
// //       name,
// //       type,
// //       description,
// //       startDate,
// //       endDate,
// //       media: mediaUrl,
// //       qrCode,
// //       spaceId,
// //       userId,
// //     });

// //     await campaign.save();
// //     res.status(201).json({ data: campaign });
// //   } catch (err) {
// //     console.error('Error creating campaign:', err);
// //     res.status(500).json({ error: { message: 'Server error' } });
// //   }
// // };

// // // Get All Campaigns
// // export const getCampaigns = async (req, res) => {
// //   try {
// //     const userId = req.user.id; // Use req.user.id
// //     const campaigns = await Campaign.find({ userId }).populate('spaceId');
// //     res.status(200).json({ data: campaigns });
// //   } catch (err) {
// //     console.error('Error fetching campaigns:', err);
// //     res.status(500).json({ error: { message: 'Server error' } });
// //   }
// // };

// // // Get Campaign by ID
// // export const getCampaignById = async (req, res) => {
// //   try {
// //     const campaign = await Campaign.findById(req.params.id).populate('spaceId');
// //     if (!campaign) {
// //       return res.status(404).json({ error: { message: 'Campaign not found' } });
// //     }
// //     if (campaign.userId.toString() !== req.user.id.toString()) { // Use req.user.id
// //       return res.status(403).json({ error: { message: 'Unauthorized access' } });
// //     }
// //     res.status(200).json({ data: campaign });
// //   } catch (err) {
// //     console.error('Error fetching campaign:', err);
// //     res.status(500).json({ error: { message: 'Server error' } });
// //   }
// // };

// // // Update Campaign
// // export const updateCampaign = async (req, res) => {
// //   try {
// //     const campaign = await Campaign.findById(req.params.id);
// //     if (!campaign) {
// //       return res.status(404).json({ error: { message: 'Campaign not found' } });
// //     }
// //     if (campaign.userId.toString() !== req.user.id.toString()) { // Use req.user.id
// //       return res.status(403).json({ error: { message: 'Unauthorized access' } });
// //     }

// //     const { name, type, description, startDate, endDate } = req.body;
// //     let mediaUrl = campaign.media;
// //     if (req.file) {
// //       if (mediaUrl) {
// //         const publicId = mediaUrl.split('/').pop().split('.')[0];
// //         await cloudinary.uploader.destroy(publicId);
// //       }
// //       mediaUrl = await uploadToCloudinary(req.file);
// //     }

// //     campaign.name = name || campaign.name;
// //     campaign.type = type || campaign.type;
// //     campaign.description = description || campaign.description;
// //     campaign.startDate = startDate || campaign.startDate;
// //     campaign.endDate = endDate || campaign.endDate;
// //     campaign.media = mediaUrl;

// //     await campaign.save();
// //     res.status(200).json({ data: campaign });
// //   } catch (err) {
// //     console.error('Error updating campaign:', err);
// //     res.status(500).json({ error: { message: 'Server error' } });
// //   }
// // };

// // // Delete Campaign
// // export const deleteCampaign = async (req, res) => {
// //   try {
// //     const campaign = await Campaign.findById(req.params.id);
// //     if (!campaign) {
// //       return res.status(404).json({ error: { message: 'Campaign not found' } });
// //     }
// //     if (campaign.userId.toString() !== req.user.id.toString()) { // Use req.user.id
// //       return res.status(403).json({ error: { message: 'Unauthorized access' } });
// //     }

// //     if (campaign.media) {
// //       const publicId = campaign.media.split('/').pop().split('.')[0];
// //       await cloudinary.uploader.destroy(publicId);
// //     }

// //     await campaign.remove();
// //     res.status(200).json({ message: 'Campaign deleted successfully' });
// //   } catch (err) {
// //     console.error('Error deleting campaign:', err);
// //     res.status(500).json({ error: { message: 'Server error' } });
// //   }
// // };

// // // Get Campaign Analytics
// // export const getCampaignAnalytics = async (req, res) => {
// //   try {
// //     const userId = req.user.id; // Use req.user.id
// //     const campaigns = await Campaign.find({ userId }).select('name scans engagementRate redemptionRate');
// //     res.status(200).json({ data: campaigns });
// //   } catch (err) {
// //     console.error('Error fetching analytics:', err);
// //     res.status(500).json({ error: { message: 'Server error' } });
// //   }
// // };



// import Campaign from '../model/campaign.js';
// import { v4 as uuidv4 } from 'uuid';
// import { v2 as cloudinary } from 'cloudinary';

// const uploadToCloudinary = (file) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { resource_type: 'auto' },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result.secure_url);
//         }
//       }
//     );
//     stream.end(file.buffer);
//   });
// };

// // Create Campaign
// export const createCampaign = async (req, res) => {
//   try {
//     console.log('Request body:', req.body); // Debug log
//     console.log('Request file:', req.file); // Debug log
//     console.log('Request user:', req.user); // Debug log

//     const { name, type, description, startDate, endDate, spaceId } = req.body;
//     const user = req.user; // From auth middleware

//     if (!user) {
//       return res.status(401).json({ error: { message: 'User not authenticated' } });
//     }

//     const userId = user.id; // Use req.user.id instead of req.user._id
//     console.log('User ID for campaign:', userId); // Debug log

//     if (!spaceId) {
//       return res.status(400).json({ error: { message: 'Space ID is required' } });
//     }

//     let mediaUrl = '';
//     if (req.file) {
//       mediaUrl = await uploadToCloudinary(req.file);
//     }

//     const qrCode = `qr_${uuidv4()}`; // Mock QR code value
//     const campaign = new Campaign({
//       name,
//       type,
//       description,
//       startDate,
//       endDate,
//       media: mediaUrl,
//       qrCode,
//       spaceId,
//       userId,
//     });

//     await campaign.save();
//     res.status(201).json({ data: campaign });
//   } catch (err) {
//     console.error('Error creating campaign:', err);
//     res.status(500).json({ error: { message: 'Server error' } });
//   }
// };

// // Get All Campaigns
// export const getCampaigns = async (req, res) => {
//   try {
//     const userId = req.user.id; // Use req.user.id
//     const campaigns = await Campaign.find({ userId }).populate('spaceId');
//     res.status(200).json({ data: campaigns });
//   } catch (err) {
//     console.error('Error fetching campaigns:', err);
//     res.status(500).json({ error: { message: 'Server error' } });
//   }
// };

// // Get Campaign by ID
// export const getCampaignById = async (req, res) => {
//   try {
//     console.log('Fetching campaign with ID:', req.params.id); // Debug log
//     console.log('Request URL:', req.originalUrl); // Debug log

//     const campaign = await Campaign.findById(req.params.id).populate('spaceId');
//     if (!campaign) {
//       return res.status(404).json({ error: { message: 'Campaign not found' } });
//     }
//     if (campaign.userId.toString() !== req.user.id.toString()) { // Use req.user.id
//       return res.status(403).json({ error: { message: 'Unauthorized access' } });
//     }
//     res.status(200).json({ data: campaign });
//   } catch (err) {
//     console.error('Error fetching campaign:', err);
//     res.status(500).json({ error: { message: 'Server error' } });
//   }
// };

// // Update Campaign
// export const updateCampaign = async (req, res) => {
//   try {
//     const campaign = await Campaign.findById(req.params.id);
//     if (!campaign) {
//       return res.status(404).json({ error: { message: 'Campaign not found' } });
//     }
//     if (campaign.userId.toString() !== req.user.id.toString()) { // Use req.user.id
//       return res.status(403).json({ error: { message: 'Unauthorized access' } });
//     }

//     const { name, type, description, startDate, endDate } = req.body;
//     let mediaUrl = campaign.media;
//     if (req.file) {
//       if (mediaUrl) {
//         const publicId = mediaUrl.split('/').pop().split('.')[0];
//         await cloudinary.uploader.destroy(publicId);
//       }
//       mediaUrl = await uploadToCloudinary(req.file);
//     }

//     campaign.name = name || campaign.name;
//     campaign.type = type || campaign.type;
//     campaign.description = description || campaign.description;
//     campaign.startDate = startDate || campaign.startDate;
//     campaign.endDate = endDate || campaign.endDate;
//     campaign.media = mediaUrl;

//     await campaign.save();
//     res.status(200).json({ data: campaign });
//   } catch (err) {
//     console.error('Error updating campaign:', err);
//     res.status(500).json({ error: { message: 'Server error' } });
//   }
// };

// // Delete Campaign
// export const deleteCampaign = async (req, res) => {
//   try {
//     const campaign = await Campaign.findById(req.params.id);
//     if (!campaign) {
//       return res.status(404).json({ error: { message: 'Campaign not found' } });
//     }
//     if (campaign.userId.toString() !== req.user.id.toString()) { // Use req.user.id
//       return res.status(403).json({ error: { message: 'Unauthorized access' } });
//     }

//     if (campaign.media) {
//       const publicId = campaign.media.split('/').pop().split('.')[0];
//       await cloudinary.uploader.destroy(publicId);
//     }

//     await campaign.remove();
//     res.status(200).json({ message: 'Campaign deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting campaign:', err);
//     res.status(500).json({ error: { message: 'Server error' } });
//   }
// };

// // Get Campaign Analytics
// export const getCampaignAnalytics = async (req, res) => {
//   try {
//     const userId = req.user.id; // Use req.user.id
//     const campaigns = await Campaign.find({ userId }).select('name scans engagementRate redemptionRate');
//     res.status(200).json({ data: campaigns });
//   } catch (err) {
//     console.error('Error fetching analytics:', err);
//     res.status(500).json({ error: { message: 'Server error' } });
//   }
// };


import Campaign from '../model/campaign.js';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
    stream.end(file.buffer);
  });
};

// Create Campaign
export const createCampaign = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('Request user:', req.user);

    const { name, type, description, startDate, endDate, spaceId } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: { message: 'User not authenticated' } });
    }

    const userId = user.id;
    console.log('User ID for campaign:', userId);

    if (!spaceId) {
      return res.status(400).json({ error: { message: 'Space ID is required' } });
    }

    let mediaUrl = '';
    if (req.file) {
      mediaUrl = await uploadToCloudinary(req.file);
    }

    const qrCode = `qr_${uuidv4()}`;
    const campaign = new Campaign({
      name,
      type,
      description,
      startDate,
      endDate,
      media: mediaUrl,
      qrCode,
      spaceId,
      userId,
    });

    await campaign.save();
    res.status(201).json({ data: campaign });
  } catch (err) {
    console.error('Error creating campaign:', err);
    res.status(500).json({ error: { message: err.message || 'Server error' } });
  }
};

// Get All Campaigns
export const getCampaigns = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Fetching campaigns for user ID:', userId);
    const campaigns = await Campaign.find({ userId }).populate('spaceId');
    res.status(200).json({ data: campaigns });
  } catch (err) {
    console.error('Error fetching campaigns:', err);
    res.status(500).json({ error: { message: err.message || 'Server error' } });
  }
};

// Get Campaign by ID
export const getCampaignById = async (req, res) => {
  try {
    console.log('Fetching campaign with ID:', req.params.id);
    console.log('Request URL:', req.originalUrl);

    const { id } = req.params;

    // Validate campaign ID format (should be a valid ObjectId)
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      console.log('Invalid campaign ID format:', id); // Debug log
      return res.status(400).json({ error: { message: 'Invalid campaign ID format' } });
    }

    const campaign = await Campaign.findById(id).populate('spaceId');
    if (!campaign) {
      return res.status(404).json({ error: { message: 'Campaign not found' } });
    }
    if (campaign.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: { message: 'Unauthorized access' } });
    }
    res.status(200).json({ data: campaign });
  } catch (err) {
    console.error('Error fetching campaign:', err);
    res.status(500).json({ error: { message: err.message || 'Server error' } });
  }
};

// Update Campaign
export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: { message: 'Campaign not found' } });
    }
    if (campaign.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: { message: 'Unauthorized access' } });
    }

    const { name, type, description, startDate, endDate } = req.body;
    let mediaUrl = campaign.media;
    if (req.file) {
      if (mediaUrl) {
        const publicId = mediaUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
      mediaUrl = await uploadToCloudinary(req.file);
    }

    campaign.name = name || campaign.name;
    campaign.type = type || campaign.type;
    campaign.description = description || campaign.description;
    campaign.startDate = startDate || campaign.startDate;
    campaign.endDate = endDate || campaign.endDate;
    campaign.media = mediaUrl;

    await campaign.save();
    res.status(200).json({ data: campaign });
  } catch (err) {
    console.error('Error updating campaign:', err);
    res.status(500).json({ error: { message: err.message || 'Server error' } });
  }
};

// Delete Campaign
export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: { message: 'Campaign not found' } });
    }
    if (campaign.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: { message: 'Unauthorized access' } });
    }

    if (campaign.media) {
      const publicId = campaign.media.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await campaign.remove();
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (err) {
    console.error('Error deleting campaign:', err);
    res.status(500).json({ error: { message: err.message || 'Server error' } });
  }
};

// Get Campaign Analytics
export const getCampaignAnalytics = async (req, res) => {
  try {
    console.log('getCampaignAnalytics called');
    console.log('Request user:', req.user);

    const user = req.user;
    if (!user || !user.id) {
      console.log('User or user.id not found in request');
      return res.status(401).json({ error: { message: 'User not authenticated' } });
    }

    const userId = user.id;
    console.log('Fetching analytics for user ID:', userId);

    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      console.log('Invalid user ID format:', userId);
      return res.status(400).json({ error: { message: 'Invalid user ID format' } });
    }

    const campaigns = await Campaign.find({ userId }).select('name scans engagementRate redemptionRate');
    console.log('Campaigns fetched:', campaigns);

    res.status(200).json({ data: campaigns });
  } catch (err) {
    console.error('Error fetching analytics:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ error: { message: err.message || 'Server error' } });
  }
};