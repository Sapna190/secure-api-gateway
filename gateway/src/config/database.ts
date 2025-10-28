import { MongoClient } from 'mongodb';
import { Pool } from 'pg';
import { config } from './index';

let mongoClient: any = null;
let pgPool: Pool | null = null;

let connectToDatabase: () => Promise<any>;
let connectDB: () => Promise<any>;
let disconnectDB: () => Promise<void>;

if (process.env.NODE_ENV === 'test') {
  connectDB = async () => Promise.resolve({});
  disconnectDB = async () => Promise.resolve();
  connectToDatabase = connectDB;
} else {
  connectToDatabase = async () => {
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

  connectDB = connectToDatabase;

  disconnectDB = async () => {
    if (mongoClient) {
      try {
        await mongoClient.close();
      } catch (e) {
        // ignore
      }
      mongoClient = null;
    }
    if (pgPool) {
      try {
        await pgPool.end();
      } catch (e) {
        // ignore
      }
      pgPool = null;
    }
  };
}

export { connectToDatabase, connectDB, disconnectDB };