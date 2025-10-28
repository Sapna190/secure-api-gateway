import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import Redis from 'ioredis';
import { createClient } from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient = createClient();
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 5, // 5 requests
  duration: 1, // per second
});

describe('Rate Limiter Middleware', () => {
  beforeAll(async () => {
    await redisClient.connect();
  });

  afterAll(async () => {
    await redisClient.quit();
  });

  it('should allow requests within limit', async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    for (let i = 0; i < 5; i++) {
      await rateLimiter.consume('test-ip');
    }

    await rateLimiter(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should block requests exceeding limit', async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    for (let i = 0; i < 5; i++) {
      await rateLimiter.consume('test-ip');
    }

    await rateLimiter.consume('test-ip'); // This should exceed the limit

    await rateLimiter(req, res, next);

    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Too many requests',
    });
    expect(next).not.toHaveBeenCalled();
  });
});