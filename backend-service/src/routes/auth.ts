import { Router } from 'express';

const router = Router();

// Simple auth routes for the backend service used during local development / tests
router.post('/login', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'username required' });
  // Return a fake token
  return res.json({ token: `${username}-token` });
});

export const authRoutes = router;
export default router;
