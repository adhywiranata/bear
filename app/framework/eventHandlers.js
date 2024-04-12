const CLICK_MATCHER = "b-click";

export const resolveInternalHandlers = (
  domToAttach,
  handlers,
  states,
  store
) => {
  if (handlers) {
    const clickables = domToAttach.querySelectorAll(`[${CLICK_MATCHER}]`);

    clickables.forEach((clickable) => {
      const handlerKey = clickable.getAttribute(CLICK_MATCHER);

      if (handlerKey && typeof handlers[handlerKey] === "function") {
        clickable.addEventListener("click", () => {
          handlers[handlerKey](states, store);
        });
      }
    });

    if (typeof handlers.onMounted === "function") {
      handlers.onMounted(states, store);
    }
  }
};
