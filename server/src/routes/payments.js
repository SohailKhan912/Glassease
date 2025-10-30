import { Router } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Order } from '../models/Order.js';
import { sendMail } from '../lib/mailer.js';

const router = Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

// Create Razorpay order
router.post('/order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    const options = {
      amount: Math.round(Number(amount) * 100), // Razorpay wants paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create Razorpay order', error: err.message });
  }
});

// Verify payment signature and mark order as paid
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_db_id } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing payment verification fields' });
    }
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET || '')
      .update(payload)
      .digest('hex');

    const valid = expected === razorpay_signature;
    if (!valid) return res.status(400).json({ message: 'Invalid signature' });

    let updated;
    if (order_db_id) {
      updated = await Order.findByIdAndUpdate(order_db_id, {
        status: 'Accepted',
        payment: {
          provider: 'razorpay',
          providerOrderId: razorpay_order_id,
          providerPaymentId: razorpay_payment_id,
          status: 'paid'
        }
      }, { new: true });
    }

    // Send confirmation email
    try {
      const to = updated?.shipping?.email || process.env.ADMIN_EMAIL;
      if (to) {
        await sendMail({
          to,
          subject: `Order Confirmation - ${updated?._id}`,
          text: `Thank you for your order! Order ID: ${updated?._id}. Total: ₹${updated?.total}.`,
          html: `<p>Thank you for your order!</p><p><b>Order ID:</b> ${updated?._id}</p><p><b>Total:</b> ₹${updated?.total}</p>`
        });
      }
    } catch (e) {
      console.warn('Email failed:', e?.message);
    }

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: 'Verification failed', error: err.message });
  }
});

export default router;
