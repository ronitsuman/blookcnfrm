import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  spaceName: { type: String, required: true },
  photoUrl: { type: String, required: true },
  meetingStart: { type: Date, required: true },
  meetingEnd: { type: Date, required: true },
  notes: { type: String, required: true },
  outcome: {
    type: String,
    enum: ['hot', 'warm', 'cold', 'not_interested'],
    default: 'cold'
  },
  category: {
    type: String,
    enum: ['rwa', 'mall', 'retail', 'cafe', 'other'],
    default: 'other'
  },
  location: {
    lat: Number,
    lng: Number
  }
}, { timestamps: true });

export default mongoose.model('Visit', visitSchema);