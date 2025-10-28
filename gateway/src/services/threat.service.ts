import { Request, Response } from 'express';
import { logger } from './logger';
import { BlocklistService } from './blocklist';

const threatPatterns = {
    sqlInjection: /\b(SELECT|UNION|INSERT|UPDATE|DELETE|DROP|--|#)\b/i,
    xss: /<script.*?>.*?<\/script>/i,
    largePayload: (body: any) => JSON.stringify(body).length > 10000, // Example threshold
};

export class ThreatService {
    static detectThreats(req: Request): number {
        let threatScore = 0;

        if (threatPatterns.sqlInjection.test(req.body)) {
            threatScore += 70;
            logger.warn('SQL Injection pattern detected', { body: req.body });
        }

        if (threatPatterns.xss.test(req.body)) {
            threatScore += 60;
            logger.warn('XSS pattern detected', { body: req.body });
        }

        if (threatPatterns.largePayload(req.body)) {
            threatScore += 30;
            logger.warn('Large payload detected', { body: req.body });
        }

        return threatScore;
    }

    static async handleThreat(req: Request, res: Response, threatScore: number) {
        if (threatScore > 80) {
            const clientIp = req.ip;
            await BlocklistService.blockIp(clientIp, 3600); // Block for 1 hour
            logger.error('Request blocked due to high threat score', { clientIp, threatScore });
            return res.status(403).json({ ok: false, reason: 'blocked', details: 'High threat score' });
        } else if (threatScore > 50) {
            logger.warn('Request throttled due to moderate threat score', { threatScore });
            return res.status(429).json({ ok: false, reason: 'throttled', details: 'Moderate threat score' });
        }

        logger.info('Request allowed', { threatScore });
    }
}