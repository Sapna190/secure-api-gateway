import { Request, Response } from 'express';
import rateLimiter from '../../src/middleware/rateLimiter';

describe('Rate Limiter Middleware', () => {
  it('should allow requests within limit', async () => {
    const req = { ip: 'test-ip' } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    // call middleware multiple times within limit
    for (let i = 0; i < 5; i++) {
      await new Promise<void>((resolve) => {
        rateLimiter(req, res, () => {
          next();
          resolve();
        });
        // if middleware responds immediately (blocked) resolve next tick
        setImmediate(() => {
          if ((res as any).status && (res as any).status.mock && (res as any).status.mock.calls.length) {
            resolve();
          }
        });
      });
    }

    expect(next).toHaveBeenCalled();
  });

  it('should block requests exceeding limit', async () => {
    const req = { ip: 'blocked-ip', headers: { 'x-test-points': '5' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    // exceed the limit
    for (let i = 0; i < 6; i++) {
      await new Promise<void>((resolve) => {
        rateLimiter(req, res, () => {
          next();
          resolve();
        });
        setImmediate(() => {
          if ((res as any).status && (res as any).status.mock && (res as any).status.mock.calls.length) {
            resolve();
          }
        });
      });
    }

  // allow microtask queue to flush
  await new Promise((r) => setImmediate(r));

  // last call should have triggered 429 and middleware should not have called next on the blocked call
  expect(res.status).toHaveBeenCalledWith(429);
  expect(res.json).toHaveBeenCalledWith({ message: 'Too many requests' });
  // next should have been called for the allowed calls (5) but not for the blocked one
  expect(next.mock.calls.length).toBe(5);
  });
});