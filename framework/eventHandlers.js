const CLICK_MATCHER = "b-click";

import { routerActions } from "./router.js";

export const resolveInternalHandlers = ({
  domToAttach,
  handlers,
  states,
  store,
  router,
}) => {
  if (handlers) {
    const enhancedRouter = { ...router, ...routerActions };
    const clickables = domToAttach.querySelectorAll(`[${CLICK_MATCHER}]`);

    clickables.forEach((clickable) => {
      const handlerKey = clickable.getAttribute(CLICK_MATCHER);

      if (handlerKey && typeof handlers[handlerKey] === "function") {
        clickable.addEventListener("click", () => {
          handlers[handlerKey]({ states, store, router: enhancedRouter });
        });
      }
    });

    if (typeof handlers.onMounted === "function") {
      handlers.onMounted({ states, store, router: enhancedRouter });
    }
  }
};
