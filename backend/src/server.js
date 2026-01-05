import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import voiceRoutes from './routes/voiceRoutes.js';
import planRoutes from './routes/planRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import offerRoutes from './routes/offerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import ttsRoutes from './routes/ttsRoutes.js'; // ← ADD THIS
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/tts', ttsRoutes); // ← ADD THIS

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'EzyVoiceCalc Backend Running' });
});

// Test TTS route
app.get('/api/tts/test', (req, res) => {
  res.json({ message: 'TTS route is working!' });
});

// Error Handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 TTS endpoint: http://localhost:${PORT}/api/tts/speak`);
});