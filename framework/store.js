import { GLOBAL_STORE_EVENT_SUBSCRIBER_NAME } from "./constants.js";

export const createGlobalStore = (initialStore) =>
  new Proxy(initialStore, {
    set: (obj, prop, value) => {
      obj[prop] = value;

      window.dispatchEvent(
        new CustomEvent(GLOBAL_STORE_EVENT_SUBSCRIBER_NAME, {
          detail: obj,
        })
      );
      return true;
    },
  });
