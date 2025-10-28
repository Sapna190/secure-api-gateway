import express from 'express';
import { proxyRequest } from '../services/proxy.service';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Proxy route for downstream services
router.all('*', authenticate, async (req, res) => {
    try {
        const response = await proxyRequest(req);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error processing request', error: error.message });
    }
});

export default router;