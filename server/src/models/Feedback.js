import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true }
  },
  { timestamps: true }
);

export const Feedback = mongoose.model('Feedback', feedbackSchema);


