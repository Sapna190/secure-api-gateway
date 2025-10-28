import { RedisClient } from 'redis';
import { promisify } from 'util';

class BlocklistService {
    private redisClient: RedisClient;
    private getAsync: (key: string) => Promise<string | null>;
    private setAsync: (key: string, value: string, expiry: number) => Promise<string>;
    private delAsync: (key: string) => Promise<number>;

    constructor(redisClient: RedisClient) {
        this.redisClient = redisClient;
        this.getAsync = promisify(this.redisClient.get).bind(this.redisClient);
        this.setAsync = promisify(this.redisClient.setex).bind(this.redisClient);
        this.delAsync = promisify(this.redisClient.del).bind(this.redisClient);
    }

    async addToBlocklist(key: string, ttl: number): Promise<void> {
        await this.setAsync(key, 'blocked', ttl);
    }

    async removeFromBlocklist(key: string): Promise<void> {
        await this.delAsync(key);
    }

    async isBlocked(key: string): Promise<boolean> {
        const result = await this.getAsync(key);
        return result === 'blocked';
    }
}

export default BlocklistService;