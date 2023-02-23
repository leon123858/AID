import express from 'express';
import { execMongo } from '../libs/db';
const router = express.Router();

// bind human on AID contract
router.get('/register/:contractId', async (req, res) => {
	const walletClient = req.body.walletClient;
	const contractId = req.params.contractId;
	if (!contractId) {
		res.status(400).send('should set contractId');
		return;
	}
	try {
		const args = {
			uid: 'AIDsampleUID',
			name: 'personSetName',
			publicKey: 'some256key',
		};
		const transactionId = await walletClient.execute('callcontract', [
			contractId,
			JSON.stringify(args),
		]);
		res.status(200).json({ transactionId, state: 'OK' });
	} catch (err) {
		res.status(500).json({ error: err });
	}
});
// 3rd party request to get user login message
router.get('/request/:userName', async (req, res) => {
	const userName = req.params.userName;
	try {
		const data = (await execMongo(async (client) => {
			const db = client.db('ourCoin');
			const collection = db.collection('state');
			return await collection.findOne({ 'state.name': userName });
		})) as any;
		res
			.status(200)
			.json({ state: 'OK', contractId: data.txid, payload: { ...data.state } });
	} catch (err) {
		console.log(err);
		res.status(500).send('something wrong');
	}
});
// 3rd party fetch block message about AID for user (3rd party should do this action in their computer)
router.get('/fetch/:contractId', async (req, res) => {
	const contractId = req.params.contractId;
	try {
		const data = (await execMongo(async (client) => {
			const db = client.db('ourCoin');
			const collection = db.collection('state');
			return await collection.findOne({ txid: contractId });
		})) as any;
		res
			.status(200)
			.json({ state: 'OK', contractId: data.txid, payload: { ...data.state } });
	} catch (err) {
		console.log(err);
		res.status(500).send('something wrong');
	}
});

export default router;
