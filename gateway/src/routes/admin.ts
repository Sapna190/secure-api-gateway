import express from 'express';
import { checkAdmin } from '../middleware/auth';
import { getLogs, blockIpOrApiKey, unblockIpOrApiKey, getStats } from '../services/admin.service';

const router = express.Router();

// Middleware to protect admin routes
router.use(checkAdmin);

// Route to get logs with pagination and filtering
router.get('/logs', async (req, res) => {
    const { limit = 50, page = 1, filter } = req.query;
    try {
        const logs = await getLogs({ limit, page, filter });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});

// Route to block an IP or API key
router.post('/block', async (req, res) => {
    const { ip, apiKeyId, reason, ttl } = req.body;
    try {
        await blockIpOrApiKey({ ip, apiKeyId, reason, ttl });
        res.status(200).json({ message: 'Blocked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to block' });
    }
});

// Route to unblock an IP or API key
router.delete('/block/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await unblockIpOrApiKey(id);
        res.status(200).json({ message: 'Unblocked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to unblock' });
    }
});

// Route to get aggregated stats
router.get('/stats', async (req, res) => {
    try {
        const stats = await getStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

export default router;