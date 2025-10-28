import { redisClient } from '../config/redis';

class BlocklistService {
    async addToBlocklist(key: string, ttl: number): Promise<void> {
        // redis v4 client uses setEx
        await (redisClient as any).setEx(key, ttl, 'blocked');
    }

    async removeFromBlocklist(key: string): Promise<void> {
        await (redisClient as any).del(key);
    }

    async isBlocked(key: string): Promise<boolean> {
        const result = await (redisClient as any).get(key);
        return result === 'blocked';
    }
}

export default new BlocklistService();