import { Application } from 'express';
import helmetMiddleware from './helmet';
import { rateLimiter } from './rateLimiter';
import { inputSanitizer } from './inputSanitizer';
import { threatDetector } from './threatDetector';
import { errorHandler } from './errorHandler';
import { authenticateJWT, authenticateApiKey } from './auth';

// Apply all middleware to the provided express application.
export const setupMiddleware = (app: Application) => {
  // Standard security headers
  app.use(helmetMiddleware());

  // Body parsers and sanitizers (assume other files export proper middleware)
  app.use(inputSanitizer());

  // Rate limiting
  app.use(rateLimiter);

  // Threat detection should run early
  app.use(threatDetector);

  // Authentication helpers are not applied globally here; they are used in routes.

  // Error handler must be last
  app.use(errorHandler);
};

export default setupMiddleware;
