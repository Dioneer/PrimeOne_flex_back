import { Router } from "./router.js";
const router = new Router();
import { answer } from './middleware.js'

router.post('/save_user_message', (req, res) => {
	answer(req, res);
});
router.get('/save_user_message', (req, res) => {
	answer(req, res);
});

export { router };