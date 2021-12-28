class CustomRouter {
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

window.customRouter = new CustomRouter();
const router = window.customRouter;
router.init();
const routerView = document.querySelector('router-vieW');
router.route('/', () => {
    if (routerView)
        routerView.innerHTML = '🏠 Home Page Here !';
});
router.route('/page1', () => {
    if (routerView)
        routerView.innerHTML = '✨ Page 1 Here !';
});
router.route('/page2', () => {
    if (routerView)
        routerView.innerHTML = '🌟 Page 2 Here !';
});
