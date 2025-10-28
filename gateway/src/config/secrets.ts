import dotenv from 'dotenv';

dotenv.config();

const secrets = {
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  apiKey: process.env.API_KEY || 'default_api_key',
  dbPassword: process.env.DB_PASSWORD || 'default_db_password',
  redisPassword: process.env.REDIS_PASSWORD || 'default_redis_password',
};

export default secrets;