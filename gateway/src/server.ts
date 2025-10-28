import express from 'express';
import { connectToDatabase } from './config/database';
import { setupMiddleware } from './middleware';
import { setupRoutes } from './routes';
import { logger } from './services/logger';
import { seedTestUserSync } from './services/auth.service';

export const app = express();
export default app;
const PORT = process.env.PORT || 3000;

// Connect to the database
connectToDatabase();

// Setup middleware
setupMiddleware(app);

// Setup routes
setupRoutes(app);

// When testing, seed a test user synchronously so integration tests can authenticate
if (process.env.NODE_ENV === 'test') {
  try {
    seedTestUserSync('test@example.com', 'password');
  } catch (e) {
    // ignore
  }
}

// Start the server only when this file is run directly.
if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`API Gateway is running on http://localhost:${PORT}`);
  });
}