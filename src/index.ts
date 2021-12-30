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
  const query = router.query['/page2'];
  if (routerView) routerView.innerHTML = '🌟 Page 2 Here !';
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
