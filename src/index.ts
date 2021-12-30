import CustomRouter from './router/index';

declare global {
  interface Window {
    customRouter: CustomRouter;
  }
}

window.customRouter = new CustomRouter();
const router = window.customRouter;

router.init();
const routerView = document.querySelector('router-view');
router.add('/', () => {
  if (routerView) routerView.innerHTML = '🏠 Home Page Here !';
});
router.add('/page1', () => {
  if (routerView) routerView.innerHTML = '✨ Page 1 Here !';
});
router.add('/page2', () => {
  const id = router.query['/page2'].id ?? '';
  if (routerView) routerView.innerHTML = '🌟 Page 2 Here !';
  if (id && routerView) routerView.innerHTML += `${id}`;
});

router.setIndex('/page2');
router.reload();
