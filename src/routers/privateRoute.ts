import express from 'express';

const router = express.Router();

// create contract by user (user should run node to do this action in his computer)
router.get('/create', async function (req, res) {
	const walletClient = req.body.walletClient;
	try {
		const transactionId = await walletClient.execute('deploycontract', [
			`state.number = state.number ? state.number + 1 : 1;
		if (!state.message) state["message"] = args.message;`,
		]);
		res.status(200).json({ contractId: transactionId, state: 'pending' });
	} catch (err) {
		res.status(500).json({ error: err });
	}
});

export default router;
