import { sign, verify } from 'jsonwebtoken';
import { User } from '../models/User';
import { ApiKey } from '../models/ApiKey';
import { config } from '../config';

const JWT_SECRET = config.JWT_SECRET;
const JWT_EXPIRATION = '1h'; // Token expiration time

export const generateToken = (user: User | ApiKey): string => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    return sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const validateToken = (token: string): Promise<User | ApiKey | null> => {
    return new Promise((resolve, reject) => {
        verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return resolve(null);
            }
            resolve(decoded as User | ApiKey);
        });
    });
};