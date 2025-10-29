import { Router } from 'express';
import { Order } from '../models/Order.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// Create order (maps from submit_booking.php)
router.post('/', async (req, res) => {
  try {
    const {
      name: customerName,
      contact,
      address,
      door_type: doorType,
      size,
      glass_type: glassType,
      imagePath
    } = req.body;

    const order = await Order.create({
      customerName,
      contact,
      address,
      doorType,
      size,
      glassType,
      imagePath
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
});

// List orders (admin/vendor dashboard)
router.get('/', requireAuth, requireRole(['admin', 'vendor']), async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// Update status (maps from update_status.php)
router.patch('/:id/status', requireAuth, requireRole(['admin', 'vendor']), async (req, res) => {
  try {
    const { status } = req.body; // Accepted | Dispatched | Delivered
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err.message });
  }
});

// Track by customer name (maps from track.php)
router.get('/track', async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: 'name is required' });
  const orders = await Order.find({ customerName: name }).sort({ createdAt: -1 });
  res.json(orders);
});

export default router;


