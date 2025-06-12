import Movement from '../models/Movement.js';

export const addMovement = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const movement = await Movement.create({
      user: req.user._id,
      coordinates: { lat, lng },
    });
    res.status(201).json({ success: true, movement });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getMyMovements = async (req, res) => {
  try {
    const movements = await Movement.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, movements });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};