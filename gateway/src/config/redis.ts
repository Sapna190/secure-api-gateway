import { createClient } from 'redis';
import { REDIS_URL } from './index';

const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

const connectRedis = async () => {
  await redisClient.connect();
};

export { redisClient, connectRedis };