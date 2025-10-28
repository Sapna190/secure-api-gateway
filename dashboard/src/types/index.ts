export type LogEntry = {
  id: string;
  timestamp: string;
  clientIp: string;
  method: string;
  path: string;
  statusCode: number;
  userId?: string;
  apiKeyId?: string;
  threatScore: number;
  actionTaken: 'allow' | 'blocked' | 'throttled';
};

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'dev';
  createdAt: string;
  updatedAt: string;
};

export type ApiKey = {
  id: string;
  ownerId: string;
  keyHash: string;
  scopes: string[];
  createdAt: string;
  expiresAt: string;
};

export type BlockedEntry = {
  id: string;
  ip: string;
  apiKeyId?: string;
  reason: string;
  createdAt: string;
  expiresAt: string;
};