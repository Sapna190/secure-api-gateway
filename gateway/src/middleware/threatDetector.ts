import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger';
import { BlocklistService } from '../services/blocklist';

const threatPatterns = [
    { regex: /\b(SELECT|UNION|INSERT|UPDATE|DELETE)\b/i, score: 70, tag: 'sql-injection' },
    { regex: /<script/i, score: 60, tag: 'xss' },
    { regex: /.{1000,}/, score: 30, tag: 'large-payload' }, // Example for large payload
];

export const threatDetector = (req: Request, res: Response, next: NextFunction) => {
    let threatScore = 0;
    const matchedTags: string[] = [];

    for (const pattern of threatPatterns) {
        if (pattern.regex.test(req.body)) {
            threatScore += pattern.score;
            matchedTags.push(pattern.tag);
        }
    }

    if (threatScore > 80) {
        logger.warn(`Threat detected: ${req.ip} - Score: ${threatScore} - Tags: ${matchedTags.join(', ')}`);
        BlocklistService.add(req.ip); // Add to blocklist
        return res.status(403).json({ ok: false, reason: 'blocked', details: 'Threat detected' });
    } else if (threatScore > 50) {
        logger.info(`Suspicious activity: ${req.ip} - Score: ${threatScore} - Tags: ${matchedTags.join(', ')}`);
        // Optionally throttle or alert admin
    }

    next();
};