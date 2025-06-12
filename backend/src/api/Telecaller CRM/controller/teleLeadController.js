import TeleLead from '../models/TeleLead.js';

// Create lead
export const createTeleLead = async (req, res) => {
  try {
    const lead = await TeleLead.create({
      ...req.body,
      telecaller: req.user.id
    });
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all leads of telecaller
export const getMyTeleLeads = async (req, res) => {
  try {
    const leads = await TeleLead.find({ telecaller: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update lead status, notes, follow-up
export const updateTeleLead = async (req, res) => {
  try {
    const lead = await TeleLead.findOneAndUpdate(
      { _id: req.params.id, telecaller: req.user.id },
      req.body,
      { new: true }
    );
    if (!lead) return res.status(404).json({ error: 'Lead not found or unauthorized' });
    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};