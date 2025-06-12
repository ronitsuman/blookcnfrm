import Visit from '../models/Visit.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

export const createVisit = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // Delete temp file after upload

    const visit = await Visit.create({
      user: req.user.id,
      spaceName: req.body.spaceName,
      photoUrl: result.secure_url,
      meetingStart: req.body.meetingStart,
      meetingEnd: req.body.meetingEnd,
      notes: req.body.notes,
      outcome: req.body.outcome,
      category: req.body.category,
      location: {
        lat: req.body.lat,
        lng: req.body.lng
      }
    });

    res.status(201).json(visit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVisits = async (req, res) => {
  try {
    const visits = await Visit.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(visits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};