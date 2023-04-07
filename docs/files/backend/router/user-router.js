import { Router } from "./router.js";
const router = new Router();

router.post('/save_user_message', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030')
	res.writeHead(200, { 'Content-Type': 'application/json' })
	res.end(JSON.stringify('ok'));
});
router.get('/save_user_message', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030')
	res.writeHead(200, { 'Content-Type': 'application/json' })
	res.end(JSON.stringify('ok'));
});

export { router };