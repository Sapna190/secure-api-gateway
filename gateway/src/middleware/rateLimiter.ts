import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redisClient from '../config/redis';

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10, // Number of points
  duration: 1, // Per second
});

const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  rateLimiter
    .consume(req.ip) // Consume 1 point per request
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({
        ok: false,
        reason: 'blocked',
        details: 'Rate limit exceeded',
      });
    });
};

export default rateLimiterMiddleware;