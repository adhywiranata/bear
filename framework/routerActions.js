import { ROUTER_RENDER_SUBCRIBER_NAME } from "./constants.js";

export const routerActions = {
  push: (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(
      new CustomEvent(ROUTER_RENDER_SUBCRIBER_NAME, {
        detail: { path },
      })
    );
  },
  replace: (path) => {
    window.history.replaceState({}, "", path);
    window.dispatchEvent(
      new CustomEvent(ROUTER_RENDER_SUBCRIBER_NAME, {
        detail: { path },
      })
    );
  },
  back: () => {
    window.history.back();
  },
};
