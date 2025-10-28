import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateLogin = [
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const validateApiKey = [
  body('apiKey').notEmpty().withMessage('API key is required'),
];

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};