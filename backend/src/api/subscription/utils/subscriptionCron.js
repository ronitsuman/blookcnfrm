import cron from 'node-cron';
import Subscription from '../models/Subscription.js';
import Space from '../models/Space.js';

const handleExpiredSubscriptions = async () => {
  try {
    console.log('Running subscription expiration cron job'); // Debug

    const expiredSubscriptions = await Subscription.find({
      endDate: { $lt: new Date() },
      status: 'active',
    });

    for (const sub of expiredSubscriptions) {
      await Subscription.updateOne({ _id: sub._id }, { status: 'inactive' });
      await Space.updateMany({ owner: sub.userId }, { priorityLevel: 0 });
      console.log(`Expired subscription for user: ${sub.userId}`); // Debug
    }
  } catch (err) {
    console.error(`Error in subscription cron: ${err.message}`, err.stack);
  }
};

// Schedule daily at midnight
cron.schedule('0 0 * * *', handleExpiredSubscriptions);

export default handleExpiredSubscriptions;