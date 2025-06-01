// backend/src/api/analytics/controllers/analyticsController.js
import Analytics from '../model/Analytics.js';
import Space from '../../space/model/Space.js';
import { UnauthorizedError } from '../../../common/error/index.js';

const getAnalyticsByUser = async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new UnauthorizedError('User not authenticated');
  
      console.log('User ID:', userId);
  
      const spaces = await Space.find({ owner: userId }).select('_id name city weekdayFootfall weekendFootfall');
      console.log('Spaces owned by user:', spaces);
  
      const spaceIds = spaces.map(space => space._id);
      console.log('Space IDs:', spaceIds);
  
      const analytics = await Analytics.find({ spaceId: { $in: spaceIds } })
        .populate('campaignId', 'title')
        .populate('spaceId', 'name city weekdayFootfall weekendFootfall');
      console.log('Raw analytics data:', analytics);
  
      const analyticsResponse = analytics.map(analytic => ({
        campaignId: analytic.campaignId?._id,
        campaignTitle: analytic.campaignId?.title,
        spaceId: analytic.spaceId?._id,
        impressions: analytic.impressions,
        clicks: analytic.clicks,
        date: analytic.date,
        space: {
          _id: analytic.spaceId?._id,
          name: analytic.spaceId?.name,
          city: analytic.spaceId?.city,
          weekdayFootfall: analytic.spaceId?.weekdayFootfall,
          weekendFootfall: analytic.spaceId?.weekendFootfall,
        },
      }));
  
      console.log('Analytics fetched:', analyticsResponse);
  
      res.status(200).json({
        status: 'success',
        data: analyticsResponse,
      });
    } catch (err) {
      console.error(`Error in getAnalyticsByUser: ${err.message}`, {
        stack: err.stack,
        userId: req.user?.id,
      });
      res.status(err.statusCode || 500).json({
        error: { message: err.message || 'Internal server error', status: err.statusCode || 500 },
      });
    }
  };

export { getAnalyticsByUser };