import { Request } from 'express';

export const proxyRequest = async (req: Request): Promise<{ status: number; data: any }> => {
  // Minimal proxy stub — in production this should forward the request to the target service
  return { status: 200, data: { ok: true, forwarded: false } };
};

export default { proxyRequest };
