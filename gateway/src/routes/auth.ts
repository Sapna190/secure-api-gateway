import express from 'express';
import { body, validationResult } from 'express-validator';
import { generateToken, validateUser } from '../services/auth.service';

const router = express.Router();

// Login route
router.post('/login', 
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await validateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user);
      return res.status(200).json({ token, expiresIn: '1h' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
);

export default router;