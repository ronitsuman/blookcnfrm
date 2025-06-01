// backend/src/api/campaign/controllers/campaignController.js
import Campaign from '../model/campaign.js';
import Analytics from '../../Analytics/model/Analytics.js';
import { UnauthorizedError, BadRequestError } from '../../../common/error/index.js';

const createCampaign = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedError('User not authenticated');

    const {
      spaceId,
      title,
      description,
      bannerImage,
      startDate,
      endDate,
      totalCost,
    } = req.body;

    if (!spaceId || !title || !description || !bannerImage || !startDate || !endDate || !totalCost) {
      throw new BadRequestError('All fields are required');
    }

    const campaign = await Campaign.create({
      spaceId,
      advertiserId: userId,
      title,
      description,
      bannerImage,
      startDate,
      endDate,
      totalCost,
      status: 'active',
    });

    // Create initial analytics entry for the campaign
    await Analytics.create({
      campaignId: campaign._id,
      spaceId: campaign.spaceId,
      impressions: 0,
      clicks: 0,
      date: new Date(),
    });

    res.status(201).json({
      status: 'success',
      data: campaign,
    });
  } catch (err) {
    console.error(`Error in createCampaign: ${err.message}`, {
      stack: err.stack,
      userId: req.user?.id,
    });
    res.status(err.statusCode || 500).json({
      error: { message: err.message || 'Internal server error', status: err.statusCode || 500 },
    });
  }
};

export { createCampaign };