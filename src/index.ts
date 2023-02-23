/**
 * Import Core Object
 */
import express from 'express';
import { apiRoute, privateRoute } from './routers';

const bcoin = require('bcoin');
const network = bcoin.Network.get('regtest');

/**
 * Init Core Object
 */

const walletClient = new bcoin.WalletClient({
	port: network.walletPort,
	apiKey: 'test',
});

const app: express.Application = express();

/**
 * Set global variable
 */

const port: number = 3000;
let isChainOpen = false;

/**
 * use middleware in first
 */

app.use(function (req, _res, next) {
	if (!req.body) {
		req.body = {};
	}
	req.body.walletClient = walletClient;
	next();
});

/**
 * Basic router
 */

app.get('/', (_req, res) => {
	res.send('This is AID server');
});

app.get('/open', async (_req, res) => {
	if (isChainOpen) {
		res.send('Open Wallet Success(have open)');
		return;
	}

	try {
		await walletClient.open();
		// subscribe to events from all wallets
		walletClient.all();
	} catch (err) {
		console.log(err);
	}
	res.send('Open Wallet Success');
	isChainOpen = true;
});

app.get('/close', async (_req, res) => {
	if (!isChainOpen) {
		res.send('Close Wallet Success(have close)');
		return;
	}
	try {
		await walletClient.close();
	} catch (err) {
		console.log(err);
	}
	res.send('Close Wallet Success');
	isChainOpen = false;
});

/**
 * Main API
 */
app.use((_req, res, next) => {
	if (!isChainOpen) {
		res.status(500).send('Should use "/open" start local node');
		return;
	}
	next();
});

app.use('/private', privateRoute);
app.use('/api', apiRoute);

/**
 * error handle
 */

app.get('*', function (_req, res) {
	res.status(404).send('route not found');
});

/**
 * Server Setup
 */
app.listen(port, async () => {
	console.log(`listening on => http://localhost:${port}/`);
});
