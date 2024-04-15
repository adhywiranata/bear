import {
  GLOBAL_STORE_WINDOW_PROPERTY,
  STORE_EVENT_SUBSCRIBER_NAME,
} from "./constants.js";
import { initRouter } from "./router.js";

export const initApp = ({ mountNode, initialStore = {} }) => {
  window[GLOBAL_STORE_WINDOW_PROPERTY] = createStore(initialStore);

  window.addEventListener("DOMContentLoaded", () => {
    initRouter({ mountNode });
  });
};

export const createStore = (initialStore) =>
  new Proxy(initialStore, {
    set: (obj, prop, value) => {
      obj[prop] = value;

      window.dispatchEvent(
        new CustomEvent(STORE_EVENT_SUBSCRIBER_NAME, {
          detail: obj,
        })
      );
      return true;
    },
  });
