import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    doorType: { type: String, enum: ['Sliding', 'Hinged'], required: true },
    size: { type: String, required: true },
    glassType: { type: String, required: true },
    imagePath: { type: String },
    status: { type: String, enum: ['Pending', 'Accepted', 'Dispatched', 'Delivered'], default: 'Pending' }
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);


