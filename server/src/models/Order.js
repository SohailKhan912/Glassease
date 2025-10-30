import mongoose from 'mongoose';

const lineItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    variantSku: { type: String }
  },
  { _id: false }
);

const shippingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: 'IN' }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [lineItemSchema],
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['Pending', 'Accepted', 'Dispatched', 'Delivered', 'Cancelled'], default: 'Pending' },
    payment: {
      provider: { type: String, enum: ['stripe', 'razorpay'] },
      providerOrderId: { type: String },
      providerPaymentId: { type: String },
      status: { type: String, enum: ['unpaid', 'paid', 'failed', 'refunded'], default: 'unpaid' }
    },
    shipping: shippingSchema
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);


