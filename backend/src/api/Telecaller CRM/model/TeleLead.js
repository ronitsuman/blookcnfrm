import mongoose from 'mongoose';

const teleLeadSchema = new mongoose.Schema({
  telecaller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  leadName: String,
  leadPhone: String,
  source: { type: String, enum: ['website', 'manual', 'referral'], default: 'manual' },
  status: { type: String, enum: ['new', 'interested', 'follow_up', 'not_interested'], default: 'new' },
  notes: String,
  followUpDate: Date
}, { timestamps: true });

export default mongoose.model('TeleLead', teleLeadSchema);