export default class CustomRouter {
    constructor(routes = new Map(), currentRoute = '') {
        this.routes = routes;
        this.currentRoute = currentRoute;
    }
    route(path, callback) {
        this.routes.set(path, callback);
    }
    refresh() {
        this.currentRoute = globalThis.location.hash.slice(1) || '/';
        const callback = this.routes.get(this.currentRoute);
        if (callback)
            callback();
    }
    init() {
        globalThis.addEventListener('load', this.refresh.bind(this), false);
        globalThis.addEventListener('hashchange', this.refresh.bind(this), false);
    }
}
