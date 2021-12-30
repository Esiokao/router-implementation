type Path = string;
type CallbackFunc = (...args: []) => void;
type Routes = Map<Path, CallbackFunc>;
type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never;
interface QueryList {
  [path: string]: {
    [key: string]: string;
  };
}
export default class CustomRouter {
  constructor(
    private routes: Routes = new Map(),
    private currentPath: Path = '',
    private visitedPath: Path[] = [],
    private index: Path = '',
    private queryList: QueryList = {},
  ) {}

  setIndex(path: Path) {
    this.index = path;
  }

  get query() {
    return this.queryList;
  }

  go<K extends KeyOfMap<Routes>>(path: K) {
    if (this.routes.has(path)) {
      this.visitedPath.push(path);
      this.currentPath = path;
      globalThis.location.hash = `#${path}`;
    }
  }

  back() {
    if (this.visitedPath.length) this.go(this.visitedPath.pop() ?? '');
  }

  add(path: Path, callbackFunc: CallbackFunc) {
    this.routes.set(path, callbackFunc);
  }

  remove(path: Path) {
    if (this.routes.has(path)) this.routes.delete(path);
  }

  getCallbackFunc(path: Path): CallbackFunc | undefined {
    if (this.routes.has(path)) return this.routes.get(path);
    return undefined;
  }

  reload() {
    const self = this;
    const hash = globalThis.location.hash.replace('#', '');
    const path = hash.substring(
      hash.indexOf('/'),
      hash.indexOf('?') === -1 ? undefined : hash.indexOf('?'),
    );
    const callbackFunc = this.getCallbackFunc(path);
    if (callbackFunc) {
      const rawParams = hash
        .substring(hash.indexOf('?') + 1 ? hash.indexOf('?') + 1 : hash.length)
        .split('&');

      const processed = rawParams.map((paramString) => paramString.split('='));

      /* eslint-disable no-param-reassign */
      const params = processed.reduce((accu, curr) => {
        const [key, value] = curr;
        accu[key] = value;
        return accu;
      }, <Record<string, string>>{});
      /* eslint-enable no-param-reassign */
      this.queryList[path] = params;
      callbackFunc.apply(self, processed as []);
    } else {
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
