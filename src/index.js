import CustomRouter from './router/index';
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
    var _a;
    const id = (_a = router.query['/page2'].id) !== null && _a !== void 0 ? _a : '';
    if (routerView)
        routerView.innerHTML = '🌟 Page 2 Here !';
    if (id && routerView)
        routerView.innerHTML += `${id}`;
});
router.setIndex('/page2');
router.reload();
