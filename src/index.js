import CustomRouter from './router/index';
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
