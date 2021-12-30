class CustomRouter {
    constructor(routes = new Map(), currentPath = '', visitedPath = [], index = '', queryList = {}) {
        this.routes = routes;
        this.currentPath = currentPath;
        this.visitedPath = visitedPath;
        this.index = index;
        this.queryList = queryList;
    }
    setIndex(path) {
        this.index = path;
    }
    get query() {
        return this.queryList;
    }
    go(path) {
        if (this.routes.has(path)) {
            this.visitedPath.push(path);
            this.currentPath = path;
            globalThis.location.hash = `#${path}`;
        }
    }
    back() {
        var _a;
        if (this.visitedPath.length)
            this.go((_a = this.visitedPath.pop()) !== null && _a !== void 0 ? _a : '');
    }
    add(path, callbackFunc) {
        this.routes.set(path, callbackFunc);
    }
    remove(path) {
        if (this.routes.has(path))
            this.routes.delete(path);
    }
    getCallbackFunc(path) {
        if (this.routes.has(path))
            return this.routes.get(path);
        return undefined;
    }
    reload() {
        const self = this;
        const hash = globalThis.location.hash.replace('#', '');
        const path = hash.substring(hash.indexOf('/'), hash.indexOf('?') === -1 ? undefined : hash.indexOf('?'));
        const callbackFunc = this.getCallbackFunc(path);
        if (callbackFunc) {
            const rawParams = hash
                .substring(hash.indexOf('?') + 1 ? hash.indexOf('?') + 1 : hash.length)
                .split('&');
            const processed = rawParams.map((paramString) => paramString.split('='));
            if (processed[0][0] === '')
                processed.shift();
            /* eslint-disable no-param-reassign */
            const params = processed.reduce((accu, curr) => {
                const [key, value] = curr;
                accu[key] = value;
                return accu;
            }, {});
            /* eslint-enable no-param-reassign */
            this.queryList[path] = params;
            callbackFunc.apply(self, processed);
        }
        else {
            self.go(self.index);
        }
    }
    init() {
        const self = this;
        globalThis.onhashchange = () => {
            self.reload();
        };
    }
    start() {
        this.reload();
    }
}

window.customRouter = new CustomRouter();
const router = window.customRouter;
router.init();
const routerView = document.querySelector('router-view');
router.add('/', () => {
    if (routerView)
        routerView.innerHTML = '🏠 Home Page Here !';
});
router.add('/page1', () => {
    if (routerView)
        routerView.innerHTML = '✨ Page 1 Here !';
});
router.add('/page2', () => {
    const query = router.query['/page2'];
    if (routerView)
        routerView.innerHTML = '🌟 Page 2 Here !';
    if (Object.keys(query).length) {
        if (routerView) {
            Object.keys(query).forEach((key) => {
                routerView.innerHTML += `<p>${key}:${query[key]}</p>`;
            });
        }
    }
});
router.setIndex('/page2');
router.reload();
