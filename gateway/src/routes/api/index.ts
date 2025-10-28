import express from 'express';
import { authenticateJWT } from '../../middleware/auth';

const router = express.Router();

// A simple endpoint used by integration tests. Uses auth when protected.
router.post('/some-endpoint', async (req, res) => {
  const { query, data } = req.body || {};
  // simple SQL pattern detection: if contains SQL keywords, return blocked
  if (typeof query === 'string' && /\b(SELECT|UNION|INSERT|UPDATE|DELETE)\b/i.test(query)) {
    return res.status(403).json({ reason: 'blocked' });
  }

  // normal response
  return res.status(200).json({ ok: true });
});

// Protected endpoint used by unit tests
router.get('/protected-endpoint', authenticateJWT, (req, res) => {
  return res.status(200).json({ message: 'Access granted' });
});

export default router;
