// Minimal admin service stubs to satisfy route imports and basic behavior.
import { Log } from '../types';
import { getInMemoryLogs } from './logger';

export const getLogs = async ({ limit = 50, page = 1, filter }: any): Promise<any[]> => {
  // In test environment return captured in-memory logs
  if (process.env.NODE_ENV === 'test') {
    const logs = getInMemoryLogs();
    // apply simple pagination
    const start = (page - 1) * limit;
    return logs.slice(start, start + limit).map((l) => ({ message: l.message, level: l.level, meta: l.meta, timestamp: l.timestamp }));
  }
  // TODO: implement real query against logs storage
  return [];
};

export const blockIpOrApiKey = async ({ ip, apiKeyId, reason, ttl }: any): Promise<void> => {
  // TODO: hook into blocklist service
  return;
};

export const unblockIpOrApiKey = async (id: string): Promise<void> => {
  // TODO: implement removal from blocklist
  return;
};

export const getStats = async (): Promise<any> => {
  return {};
};

export default { getLogs, blockIpOrApiKey, unblockIpOrApiKey, getStats };
