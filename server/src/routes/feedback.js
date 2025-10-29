import { Router } from 'express';
import { Feedback } from '../models/Feedback.js';

const router = Router();

// Create feedback (maps from feedback.php)
router.post('/', async (req, res) => {
  try {
    const { order_id, rating, comment } = req.body;
    const fb = await Feedback.create({ orderId: order_id, rating, comment });
    res.status(201).json(fb);
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit feedback', error: err.message });
  }
});

export default router;


