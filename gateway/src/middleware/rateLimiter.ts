import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { redisClient } from '../config/redis';

// Use an in-memory rate limiter for test environment to avoid network dependencies.
let rateLimiterMiddleware: (req: Request, res: Response, next: NextFunction) => void;

if (process.env.NODE_ENV === 'test') {
  // Simple in-memory store for tests
  const store = new Map<string, { tokens: number; resetAt: number }>();
  const POINTS = process.env.TEST_RATE_LIMIT_POINTS ? Number(process.env.TEST_RATE_LIMIT_POINTS) : 1000;
  const DURATION = 1; // seconds

  const inMemoryConsume = async (key: string) => {
    const now = Date.now();
    const item = store.get(key);
    if (!item || now > item.resetAt) {
      store.set(key, { tokens: 1, resetAt: now + DURATION * 1000 });
      return Promise.resolve();
    }
    if (item.tokens < POINTS) {
      item.tokens += 1;
      store.set(key, item);
      return Promise.resolve();
    }
    // emulate rate-limiter-flexible rejection
    const error: any = new Error('Too Many Requests');
    error.msBeforeNext = item.resetAt - now;
    return Promise.reject(error);
  };

  rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const key = (req.ip || (req as any).connection?.remoteAddress || '') as string;
    // allow per-request override via header for tests: set 'x-test-points' to a small number to simulate blocking
    const headerPoints = req.headers && (req.headers as any)['x-test-points'] ? Number((req.headers as any)['x-test-points']) : undefined;

    const effectiveConsume = async (k: string) => {
      // if headerPoints provided, use it as the POINTS threshold for this single consume cycle
      if (typeof headerPoints === 'number' && !Number.isNaN(headerPoints)) {
        const now = Date.now();
        const item = store.get(k);
        if (!item || now > item.resetAt) {
          store.set(k, { tokens: 1, resetAt: now + DURATION * 1000 });
          return Promise.resolve();
        }
        if (item.tokens < headerPoints) {
          item.tokens += 1;
          store.set(k, item);
          return Promise.resolve();
        }
        const error: any = new Error('Too Many Requests');
        error.msBeforeNext = item.resetAt - now;
        return Promise.reject(error);
      }
      return inMemoryConsume(k);
    };

    effectiveConsume(key)
      .then(() => next())
      .catch(() => {
        res.status(429).json({ message: 'Too many requests' });
      });
  };
} else {
  const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient as any,
    keyPrefix: 'rateLimiter',
    points: 10, // Number of points
    duration: 1, // Per second
  });

  rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    rateLimiter
      .consume((req.ip || req.connection.remoteAddress || '') as string)
      .then(() => next())
      .catch(() => {
        res.status(429).json({
          ok: false,
          reason: 'blocked',
          details: 'Rate limit exceeded',
        });
      });
  };
}

export default rateLimiterMiddleware;