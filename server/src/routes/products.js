import { Router } from 'express';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = Router();

// Create product (admin)
router.post('/', requireAuth, requireRole(['admin', 'vendor']), async (req, res) => {
  try {
    const body = req.body;
    const product = await Product.create(body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create product', error: err.message });
  }
});

// Update product (admin)
router.patch('/:id', requireAuth, requireRole(['admin', 'vendor']), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update product', error: err.message });
  }
});

// Delete product (admin)
router.delete('/:id', requireAuth, requireRole(['admin', 'vendor']), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// List products with search/filters/sort/pagination
router.get('/', async (req, res) => {
  const {
    q, // search query
    category, // category id or slug
    minPrice,
    maxPrice,
    sort = 'createdAt:desc',
    page = 1,
    limit = 20
  } = req.query;

  const filter = { isActive: true };
  if (q) {
    filter.$text = { $search: q };
  }
  if (category) {
    let catDoc = null;
    if (mongoose.isValidObjectId(category)) {
      catDoc = await Category.findById(category).select('_id');
    }
    if (!catDoc) {
      catDoc = await Category.findOne({ slug: String(category).toLowerCase() }).select('_id');
    }
    if (catDoc) filter.category = catDoc._id;
  }
  if (minPrice || maxPrice) {
    filter['price.amount'] = {};
    if (minPrice) filter['price.amount'].$gte = Number(minPrice);
    if (maxPrice) filter['price.amount'].$lte = Number(maxPrice);
  }

  const [sortField, sortDir] = String(sort).split(':');
  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort({ [sortField]: sortDir === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(filter)
  ]);

  res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
});

// Get product by slug or id
router.get('/detail/:slugOrId', async (req, res) => {
  const { slugOrId } = req.params;
  let product = null;
  if (mongoose.isValidObjectId(slugOrId)) {
    product = await Product.findById(slugOrId);
  }
  if (!product) {
    product = await Product.findOne({ slug: slugOrId });
  }
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

export default router;


