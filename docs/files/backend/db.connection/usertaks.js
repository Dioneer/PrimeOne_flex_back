import { saveDataFromUser } from './models.js';
import { db } from './db.connection.js';

export const createTable = async (userName, userEmail, userPhone, userMessage) => {
	await db.sync();

	const savedUser = `User ${userName} was saved`
	await saveDataFromUser.create({ userName, userEmail, userPhone, userMessage });
	return savedUser;
}