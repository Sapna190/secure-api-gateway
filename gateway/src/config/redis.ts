import { createClient } from 'redis';
import { REDIS_URL } from './index';

let redisClient: any;
let connectRedis: () => Promise<void>;

// In test environment export a lightweight stub to avoid network calls
if (process.env.NODE_ENV === 'test') {
  redisClient = {
    on: (_: string, __: any) => {},
    connect: async () => Promise.resolve(),
    quit: async () => Promise.resolve(),
    setEx: async (_key: string, _ttl: number, _value: string) => Promise.resolve('OK'),
    get: async (_key: string) => null,
    del: async (_key: string) => 0,
  } as any;

  connectRedis = async () => Promise.resolve();
} else {
  redisClient = createClient({
    url: REDIS_URL,
  });

  redisClient.on('error', (err: any) => {
    console.error('Redis Client Error', err);
  });

  connectRedis = async () => {
    await redisClient.connect();
  };
}

export { redisClient, connectRedis };