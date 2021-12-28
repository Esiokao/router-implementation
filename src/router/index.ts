type Routes = Map<string, () => void>;

export default class CustomRouter {
  constructor(private routes: Routes = new Map(), private currentRoute: string = '') {}

  route(path: string, callback: () => void) {
    this.routes.set(path, callback);
  }

  refresh() {
    this.currentRoute = globalThis.location.hash.slice(1) || '/';
    const callback = this.routes.get(this.currentRoute);
    if (callback) callback();
  }

  init() {
    globalThis.addEventListener('load', this.refresh.bind(this), false);
    globalThis.addEventListener('hashchange', this.refresh.bind(this), false);
  }
}
