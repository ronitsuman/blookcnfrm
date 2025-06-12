import Subscription from '../models/Subscription.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

export const createSubscription = async (req, res) => {
  try {
    const photos = [];

    if (req.files && req.files.photos) {
      for (const file of req.files.photos) {
        const result = await cloudinary.uploader.upload(file.path);
        photos.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }

    const subscription = await Subscription.create({
      user: req.user.id,
      spaceName: req.body.spaceName,
      amount: req.body.amount,
      commissionRate: req.body.commissionRate || 10,
      spaceDetails: {
        address: req.body.address,
        category: req.body.category,
        city: req.body.city,
        photos
      }
    });

    res.status(201).json(subscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};