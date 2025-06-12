import mongoose from 'mongoose';

const targetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: Number,  // 1 to 12
  year: Number,
  targetAmount: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Target', targetSchema);