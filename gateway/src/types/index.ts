export type User = {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'dev';
  createdAt: Date;
  updatedAt: Date;
};

export type ApiKey = {
  id: string;
  ownerId: string;
  keyHash: string;
  scopes: string[];
  createdAt: Date;
  expiresAt: Date;
};

export type Log = {
  timestamp: Date;
  clientIp: string;
  method: string;
  path: string;
  statusCode: number;
  userId?: string;
  apiKeyId?: string;
  headers: Record<string, string>;
  bodySummary: string;
  threatScore: number;
  threatTags: string[];
  actionTaken: 'allow' | 'blocked' | 'throttled';
};