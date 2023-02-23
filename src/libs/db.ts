import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

export const execMongo = async (callback: (client: MongoClient) => {}) => {
	await client.connect();
	const result = await callback(client);
	await client.close();
	return result;
};
