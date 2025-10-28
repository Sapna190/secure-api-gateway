import dotenv from 'dotenv';

dotenv.config();

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  DB_TYPE: process.env.DB_TYPE || 'mongodb',
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/secure-api-gateway',
  MONGODB_URI: process.env.MONGODB_URI || process.env.DB_URL || 'mongodb://localhost:27017/secure-api-gateway',
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'secure-api-gateway',
  POSTGRESQL_URI: process.env.POSTGRESQL_URI || process.env.DB_URL || '',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  JWT_EXPIRATION: process.env.JWT_EXPIRES_IN || '1h',
  API_KEY_SECRET: process.env.API_KEY_SECRET || 'your_api_key_secret',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  RATE_LIMIT_WINDOW: Number(process.env.RATE_LIMIT_WINDOW) || 15,
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX) || 100,
};

// Named exports for compatibility with existing imports
export const PORT = defaultConfig.PORT;
export const DB_TYPE = defaultConfig.DB_TYPE;
export const DB_URL = defaultConfig.DB_URL;
export const MONGODB_URI = defaultConfig.MONGODB_URI;
export const MONGODB_DB_NAME = defaultConfig.MONGODB_DB_NAME;
export const POSTGRESQL_URI = defaultConfig.POSTGRESQL_URI;
export const REDIS_URL = defaultConfig.REDIS_URL;
export const JWT_SECRET = defaultConfig.JWT_SECRET;
export const JWT_EXPIRATION = defaultConfig.JWT_EXPIRATION;
export const API_KEY_SECRET = defaultConfig.API_KEY_SECRET;
export const LOG_LEVEL = defaultConfig.LOG_LEVEL;
export const RATE_LIMIT_WINDOW = defaultConfig.RATE_LIMIT_WINDOW;
export const RATE_LIMIT_MAX = defaultConfig.RATE_LIMIT_MAX;

export const config = defaultConfig;
export default defaultConfig;