import { GLOBAL_STORE_WINDOW_PROPERTY } from "./framework/constants.js";
import { initRouter } from "./lib/router.js";
import { store } from "./lib/store.js";

window[GLOBAL_STORE_WINDOW_PROPERTY] = store;

window.addEventListener("DOMContentLoaded", () => {
  initRouter();
});
