import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToDatabase } from './lib/db.js';
import authRouter from './routes/auth.js';
import ordersRouter from './routes/orders.js';
import feedbackRouter from './routes/feedback.js';
import uploadRouter from './routes/upload.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static uploads directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// API routes
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/upload', uploadRouter);

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});


