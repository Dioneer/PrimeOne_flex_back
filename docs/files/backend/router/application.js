import http from "http";
import EventEmitter from "events";

export class Application {
	constructor() {
		this.emitter = new EventEmitter();
		this.server = this._createServer();
		this.middlewares = [];
	}
	listen(port, callback) {
		this.server.listen(port, callback);
	}
	use(middleware) {
		this.middlewares.push(middleware)
	}
	addRouter(router) {
		Object.keys(router.endpoints).forEach((path) => {
			const endpoint = router.endpoints[path];
			Object.keys(endpoint).forEach((method) => {
				this.emitter.on(this._routerMask(path, method), (req, res) => {
					const handler = endpoint[method];
					handler(req, res)
				})
			})
		})
	}
	_createServer() {
		return http.createServer((req, res) => {
			this.middlewares.forEach(middleware => { middleware(req, res) });
			const emitted = this.emitter.emit(this._routerMask(req.pathname, req.method), req, res);
			if (!emitted) {
				res.writeHead(404);
				res.end("Page not found");
			}
		})
	}
	_routerMask(path, method) {
		return `[${path}]: [${method}]`;
	}
}