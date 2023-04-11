import formidable from 'formidable';
const form = formidable({ multiples: true });
import * as fs from 'fs';
import path from 'path';
import { createTable } from '../db.connection/usertaks.js'

export const parserJSON = (req, res) => {
	res.send = (code, ct, data) => {
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030')
		res.writeHead(code), { 'Content-Type': ct }
		res.end(JSON.stringify(data));
	}
};

export const err = async (req, res, err) => {
	parserBody(req, res).then(data => res.send(err.httpCode || 400, 'application/json', data))
	return;
}

export const answer = async (req, res) => {
	parserBody(req, res).then(data => res.send(err.httpCode || 200, 'application/json', data))
	return;
}

export const parserBody = (req, res) => {
	return new Promise((res, rej) => {
		form.parse(req, async (err, fields) => {
			if (err) {
				rej(err);
			}
			let resume = await createObj(fields.userName, fields.email_or_phone, fields.message);
			let resp = await createTable(resume.userName, resume.userEmail, resume.userPhone, resume.userMessage);
			resume.add = resp;
			await saveFile(path.resolve('./savedata.json'), JSON.stringify(resume));
			let resumeReadFile = await readFile('./savedata.json');
			res(resumeReadFile);
		});
	})
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
