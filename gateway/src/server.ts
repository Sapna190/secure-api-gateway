import express from 'express';
import { connectToDatabase } from './config/database';
import { setupMiddleware } from './middleware';
import { setupRoutes } from './routes';
import { logger } from './services/logger';

export const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectToDatabase();

// Setup middleware
setupMiddleware(app);

// Setup routes
setupRoutes(app);

// Start the server only when this file is run directly.
if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`API Gateway is running on http://localhost:${PORT}`);
  });
}