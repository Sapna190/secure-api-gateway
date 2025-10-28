import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getSecret } from '../config/secrets';
import { User } from '../models/User';
import { ApiKey } from '../models/ApiKey';

const JWT_SECRET = getSecret('JWT_SECRET');

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

export const authenticateApiKey = async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.sendStatus(403);
    }

    const apiKeyRecord = await ApiKey.findOne({ keyHash: apiKey });

    if (!apiKeyRecord) {
        return res.sendStatus(403);
    }

    req.apiKey = apiKeyRecord;
    next();
};