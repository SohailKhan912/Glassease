import { Router } from 'express';
import { Wishlist } from '../models/Wishlist.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/', async (req, res) => {
  const userId = req.user?.sub;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const wl = await Wishlist.findOne({ user: userId }).populate('items.product');
  res.json(wl || { user: userId, items: [] });
});

router.post('/:productId', async (req, res) => {
  const userId = req.user?.sub;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const wl = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $addToSet: { items: { product: req.params.productId } } },
    { upsert: true, new: true }
  );
  res.status(201).json(wl);
});

router.delete('/:productId', async (req, res) => {
  const userId = req.user?.sub;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const wl = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $pull: { items: { product: req.params.productId } } },
    { new: true }
  );
  res.json(wl);
});

export default router;


