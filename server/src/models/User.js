import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin', 'vendor'], default: 'customer' }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);


