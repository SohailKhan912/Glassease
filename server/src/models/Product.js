import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema(
  {
    currency: { type: String, default: 'INR' },
    amount: { type: Number, required: true }
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    attributes: { type: Map, of: String },
    price: priceSchema,
    stock: { type: Number, default: 0 }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: 'text' },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true },
    images: [{ type: String }],
    modelUrl: { type: String }, // 3D/AR model URL (glb/usdz)
    price: priceSchema,
    variants: [variantSchema],
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    tags: [{ type: String, index: true }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);


