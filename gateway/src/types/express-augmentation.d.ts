import { User as UserType, ApiKey as ApiKeyType } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: UserType | any;
      apiKey?: ApiKeyType | any;
    }
  }
}

export {};
