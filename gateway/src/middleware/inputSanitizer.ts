import { Request, Response, NextFunction } from 'express';

const sanitizeInput = (input: string): string => {
    return input.replace(/<script.*?>.*?<\/script>/gi, '')
                .replace(/[\<\>\{\}\[\]\(\)\'\"\\]/g, '')
                .trim();
};

const inputSanitizer = (req: Request, res: Response, next: NextFunction) => {
    for (const key in req.body) {
        if (typeof req.body[key] === 'string') {
            req.body[key] = sanitizeInput(req.body[key]);
        }
    }
    next();
};

export default inputSanitizer;