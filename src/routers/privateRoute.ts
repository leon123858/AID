import express from 'express';

const router = express.Router();

// create contract by user (user should run node to do this action in his computer)
router.get('/create', function (_req, res) {
	res.status(200).json({ contractId: 'sampleId', state: 'OK' });
});

export default router;
