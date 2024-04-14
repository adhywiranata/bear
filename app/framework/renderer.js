import { resolveInternalHandlers } from "./eventHandlers.js";
import { hydrateToStateful } from "./client.js";
import {
  render as renderHeader,
  handlers as HeaderHandlers,
} from "../components/header.js";

const generateUniqueStateId = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 12) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const renderPage = (
  resolverWithoutStates,
  states = {},
  globalStates = {},
  mountNode = null
) => {
  const { path = "/", render, handlers, router } = resolverWithoutStates;

  // render method. trim is required to avoid whitespaces during templating
  const routeToRender = hydrateToStateful({
    renderer: render,
    states,
    store: globalStates,
    router,
  }).trim();
  const brbn = generateUniqueStateId() + path.split("/").join("-");

  const layoutToRender = hydrateToStateful({
    renderer: renderHeader,
    states,
    store: globalStates,
    router,
  }).trim();

  mountNode.innerHTML =
    layoutToRender + `<br-bn id=${brbn}></br-bn>` + routeToRender;

  const layoutElem = document.querySelector("header");
  resolveInternalHandlers({
    domToAttach: layoutElem,
    handlers: HeaderHandlers,
    states,
    store: globalStates,
    router,
  });

  // attach handlers to rendered html
  const ggTag = document.getElementById(brbn);

  if (ggTag) {
    const targetElem = ggTag.nextSibling;
    resolveInternalHandlers({
      domToAttach: targetElem,
      handlers,
      states,
      store: globalStates,
      router,
    });
  } else {
    console.error(`[Framework Error] no element found for ${brbn}`);
  }
};
