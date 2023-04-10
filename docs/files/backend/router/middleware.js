import formidable from 'formidable';
const form = formidable({ multiples: true });
import * as fs from 'fs';
import path from 'path';
import { createTable } from '../db.connection/usertaks.js'

export const parserJSON = (req, res) => {
	res.send = (code, contType, data) => {
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030')
		res.writeHead(code, { 'Content-Type': contType })
		res.end(data);
	}
};

export const err = (req, res, err) => {
	res.send(err.httpCode || 400, 'text/plain', String(err))
	return;
}

export const answer = (req, res) => {
	readFile(path.join(path.resolve(), 'savedata.json')).then(data => res.send(200, 'application/json', data))
}

export const parserBody = (req, res) => {
	form.parse(req, async (err, fields) => {
		if (err) {
			err(req, res, err);
		}
		let resume = await createObj(fields.userName, fields.email_or_phone, fields.message);
		let resp = await createTable(resume.userName, resume.userEmail, resume.userPhone, resume.userMessage);
		resume.add = resp;
		await saveFile(path.resolve('./savedata.json'), JSON.stringify(resume));
	});
};


export const URLParse = (base) => (req, res) => {
	const ParseURL = new URL(req.url, base);
	const params = {};
	ParseURL.searchParams.forEach((value, key) => {
		params[key] = value;
	})
	req.pathname = ParseURL.pathname;
	req.params = params;
}

const readFile = async (path) => {
	return new Promise((res, rej) => {
		let body = '';
		const readStream = fs.createReadStream(path, { encoding: 'UTF-8' });
		readStream.on('error', (err) => unlink(path, () => rej(err)));
		readStream.on('data', function (chunk) {
			body += chunk.toString();
		});
		readStream.on('close', () => fs.stat(path, err => err ? rej(err) : res(body)))
	});
}

const saveFile = async (path, body) => {
	return new Promise((res, rej) => {
		const writeStream = fs.createWriteStream(path, "utf-8");
		writeStream.write(body, "utf-8");
		writeStream.on('finish', () => {
			fs.stat(path, err => err ? rej(err) : res())
		});
		writeStream.on('error', (err) => unlink(path, () => rej(err)));
		writeStream.end();
	});
}

const createObj = (userName, userEmail, userMessage) => {
	const obj = {
		userName,
		userMessage,
	}
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(userEmail)) {
		obj.userEmail = userEmail;
		obj.userPhone = '';
	} else { obj.userEmail = ''; obj.userPhone = userEmail }
	return obj;
}
