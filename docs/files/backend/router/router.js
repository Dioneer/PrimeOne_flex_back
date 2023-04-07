export class Router {
	constructor() {
		this.endpoints = {};
	}
	reguest(path, method = "GET", handler) {
		if (!this.endpoints[path]) {
			this.endpoints[path] = {}
		}
		const endpoint = this.endpoints[path];

		if (endpoint[method]) {
			throw new Error(`this ${method} by this ${path} already exist`)
		}
		endpoint[method] = handler;
	}
	get(path, handler) {
		this.reguest(path, 'GET', handler)
	}
	post(path, handler) {
		this.reguest(path, 'POST', handler)
	}
	put(path, handler) {
		this.reguest(path, 'PUT', handler)
	}
	delete(path, handler) {
		this.reguest(path, 'DELETE', handler)
	}
}

