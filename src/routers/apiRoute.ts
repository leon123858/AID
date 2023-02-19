import express from 'express';

const router = express.Router();

// bind human on AID contract
router.get('/register', function (_req, res) {
	res.status(200).json({ state: 'OK' });
});
// 3rd party request to get user login message
router.get('/request', function (_req, res) {
	res.status(200).json({ state: 'OK' });
});
// 3rd party fetch block message about AID for user (3rd party should do this action in their computer)
router.get('/fetch', function (_req, res) {
	res.status(200).json({ state: 'OK' });
});

export default router;
