import { MongoClient } from 'mongodb';
import { Pool } from 'pg';
import { config } from './index';

let mongoClient: MongoClient | null = null;
let pgPool: Pool | null = null;

export const connectToDatabase = async () => {
  if (config.DB_TYPE === 'mongodb') {
    if (!mongoClient) {
      mongoClient = new MongoClient(config.MONGODB_URI);
      await mongoClient.connect();
    }
    return mongoClient.db(config.MONGODB_DB_NAME);
  } else if (config.DB_TYPE === 'postgresql') {
    if (!pgPool) {
      pgPool = new Pool({
        connectionString: config.POSTGRESQL_URI,
      });
    }
    return pgPool;
  } else {
    throw new Error('Unsupported database type');
  }
};