import { Application } from 'express';
import authRoutes from './auth';
import adminRoutes from './admin';
import proxyRoutes from './proxy';

export const setupRoutes = (app: Application) => {
  app.use('/auth', authRoutes);
  app.use('/admin', adminRoutes);
  app.use('/proxy', proxyRoutes);
};

export default setupRoutes;
