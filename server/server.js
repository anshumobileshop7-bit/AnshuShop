import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { seedDatabase } from './utils/seedData.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import offerRoutes from './routes/offerRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(helmet()); // Secure HTTP headers
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = process.env.CLIENT_URL 
        ? process.env.CLIENT_URL.split(',').map(url => url.trim())
        : ['*'];
      
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Global Rate Limiting for all API routes (prevents spam/DDoS)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300, // Limit each IP to 300 requests per `window`
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' },
});
app.use('/api', apiLimiter);

// Root endpoint (Welcome message for when you visit the API URL directly)
app.get('/', (req, res) => {
  res.send('Welcome to Anshu Mobile World API. Please use /api endpoints.');
});

// Ignore favicon requests to keep logs clean
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Anshu Mobile World API is running smoothly',
  });
});

// API Routes
app.use('/api/admin', authRoutes);
app.use('/api/admin/stats', statsRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/settings', settingsRoutes);

// Admin dedicated mounting for convenience
app.use('/api/admin/hero', heroRoutes);
app.use('/api/admin/offers', offerRoutes);
app.use('/api/admin/gallery', galleryRoutes);
app.use('/api/admin/about', aboutRoutes);
app.use('/api/admin/settings', settingsRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to DB and Start Server
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Anshu Mobile World API Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

// Trigger restart
