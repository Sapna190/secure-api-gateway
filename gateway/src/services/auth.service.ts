import { sign, verify } from 'jsonwebtoken';
import User from '../models/User';
import ApiKey from '../models/ApiKey';
import { config } from '../config';
import bcrypt from 'bcrypt';

const JWT_SECRET = (config as any).JWT_SECRET || 'default_jwt_secret';
const JWT_EXPIRATION = '1h'; // Token expiration time

export const generateToken = (user: any): string => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    return sign(payload, JWT_SECRET as string, { expiresIn: JWT_EXPIRATION });
};

export const validateToken = (token: string): Promise<any | null> => {
    return new Promise((resolve) => {
        verify(token, JWT_SECRET as string, (err: any, decoded: any) => {
            if (err) return resolve(null);
            resolve(decoded as any);
        });
    });
};

export const validateUser = async (email: string, password: string): Promise<any | null> => {
    if (process.env.NODE_ENV === 'test') {
        for (const u of testUserStore.values()) {
            if (u.email === email) {
                const match = await bcrypt.compare(password, u.passwordHash || '');
                return match ? u : null;
            }
        }
        return null;
    }

    const user = await (User as any).findOne({ email }).lean();
    if (!user) return null;
    const match = await bcrypt.compare(password, user.passwordHash || '');
    if (!match) return null;
    return user;
};

// Helpers used by tests to manage test users
// For tests we keep an in-memory user store to avoid hitting real MongoDB
const testUserStore = new Map<string, any>();

export const createUser = async (data: { email: string; password: string; role?: string }) => {
    if (process.env.NODE_ENV === 'test') {
        // if a user with the same email already exists in the test store, update its passwordHash and role
        for (const [k, v] of testUserStore.entries()) {
            if (v.email === data.email) {
                const passwordHash = await bcrypt.hash(data.password, 10);
                v.passwordHash = passwordHash;
                v.role = data.role || v.role || 'user';
                v.updatedAt = new Date();
                testUserStore.set(k, v);
                return v;
            }
        }
        const id = String(testUserStore.size + 1);
        const passwordHash = await bcrypt.hash(data.password, 10);
        const user = { id, email: data.email, passwordHash, role: data.role || 'user', createdAt: new Date() };
        testUserStore.set(id, user);
        return user;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const created = await (User as any).create({ email: data.email, passwordHash, role: data.role || 'user' });
    return created.toObject ? created.toObject() : created;
};

export const deleteUser = async (id: string) => {
    if (process.env.NODE_ENV === 'test') {
        testUserStore.delete(id);
        return;
    }

    try {
        await (User as any).findByIdAndDelete(id);
    } catch (e) {
        // ignore
    }
};

// Synchronous test seed helper (useful to avoid async race on server import)
export const seedTestUserSync = (email: string, password: string, role?: string) => {
    if (process.env.NODE_ENV !== 'test') return;
    // if exists update
    for (const [k, v] of testUserStore.entries()) {
        if (v.email === email) {
            const passwordHash = bcrypt.hashSync(password, 10);
            v.passwordHash = passwordHash;
            v.role = role || v.role || 'user';
            v.updatedAt = new Date();
            testUserStore.set(k, v);
            return v;
        }
    }
    const id = String(testUserStore.size + 1);
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = { id, email, passwordHash, role: role || 'user', createdAt: new Date() };
    testUserStore.set(id, user);
    return user;
};