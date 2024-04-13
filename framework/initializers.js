import { GLOBAL_STORE_WINDOW_PROPERTY } from "./constants.js";
import { initRouter } from "./routeHandler.js";
import { createGlobalStore } from "./store.js";

export const initApp = (initialStore = {}) => {
  window[GLOBAL_STORE_WINDOW_PROPERTY] = createGlobalStore(initialStore);

  window.addEventListener("DOMContentLoaded", () => {
    initRouter();
  });
};
