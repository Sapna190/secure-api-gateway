import { Application } from 'express';
import helmetMiddleware from './helmet';
import rateLimiter from './rateLimiter';
import inputSanitizer from './inputSanitizer';
import threatDetectorMiddleware from './threatDetector';
import errorHandler from './errorHandler';
import { authenticateJWT, authenticateApiKey } from './auth';
import { logInfo } from '../services/logger';

// Apply all middleware to the provided express application.
export const setupMiddleware = (app: Application) => {
  // Standard security headers
  // Helmet middleware (already configured)
  app.use(helmetMiddleware);

  // Body parsers and sanitizers
  // parse JSON bodies first
  app.use((require('express') as any).json());
  app.use(inputSanitizer);

  // Simple request logger that records all requests into in-memory logs during tests
  const requestLogger = (req: any, res: any, next: any) => {
    try {
      logInfo('request', { method: req.method, path: req.path, ip: req.ip, body: req.body });
    } catch (e) {
      // keep logging best-effort
    }
    next();
  };
  app.use(requestLogger);

  // Rate limiting middleware
  app.use(rateLimiter);

  // Threat detection should run early
  app.use(threatDetectorMiddleware);

  // Error handler must be last
  app.use(errorHandler);
};

export default setupMiddleware;
