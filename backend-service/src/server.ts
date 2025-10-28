import express from 'express';
import { connectToDatabase } from './config/database';
import { setupRedis } from './config/redis';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { authRoutes } from './routes/auth';
import { apiRoutes } from './routes/api';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(express.json());

// Connect to database
connectToDatabase()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });

// Setup Redis
setupRedis();

// Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend service is running on http://localhost:${PORT}`);
});