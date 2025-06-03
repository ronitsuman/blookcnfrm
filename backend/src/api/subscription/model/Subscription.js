import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
userId: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User',
required: [true, 'User ID is required'],
},
planType: {
type: String,
enum: ['free', 'paid'],
required: [true, 'Plan type is required'],
},
status: {
type: String,
enum: ['active', 'inactive', 'cancelled'],
default: 'active',
},
paymentId: {
type: String,
},
amount: {
type: Number,
min: [0, 'Amount cannot be negative'],
},
startDate: {
type: Date,
required: [true, 'Start date is required'],
default: Date.now,
},
endDate: {
type: Date,
required: [true, 'End date is required'],
},
features: {
type: [String],
},
}, {
timestamps: true,
});

SubscriptionSchema.index({ userId: 1, startDate: 1 });

export default mongoose.model('Subscription', SubscriptionSchema);