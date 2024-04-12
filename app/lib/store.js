import { GLOBAL_STORE_EVENT_SUBSCRIBER_NAME } from "../framework/constants.js";

const initialStore = {
  username: undefined,
};

export const store = new Proxy(initialStore, {
  set: (obj, prop, value) => {
    obj[prop] = value;

    window.dispatchEvent(new Event(GLOBAL_STORE_EVENT_SUBSCRIBER_NAME), {
      detail: obj,
    });
    return true;
  },
});
