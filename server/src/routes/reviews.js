import { Router } from 'express';
import { Review } from '../models/Review.js';
import { Product } from '../models/Product.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Create or update a review for a product by the current user
router.post('/:productId', requireAuth, async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    const userId = req.user?.sub;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const review = await Review.findOneAndUpdate(
      { product: req.params.productId, user: userId },
      { rating, title, comment },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Update product aggregates
    const agg = await Review.aggregate([
      { $match: { product: review.product } },
      { $group: { _id: '$product', rating: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    if (agg[0]) {
      await Product.findByIdAndUpdate(review.product, { rating: agg[0].rating, ratingCount: agg[0].count });
    }

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: 'Failed to submit review', error: err.message });
  }
});

// List reviews for a product
router.get('/:productId', async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 }).limit(50);
  res.json(reviews);
});

export default router;


