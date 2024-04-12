import { resolveInternalHandlers } from "../framework/eventHandlers.js";

import { hydrateToStateful } from "../framework/hydrate.js";

import { routes } from "../routes/index.js";
import {
  render as renderHeader,
  handlers as HeaderHandlers,
} from "../components/header.js";
import { GLOBAL_STORE_EVENT_SUBSCRIBER_NAME } from "../framework/constants.js";

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const renderPage = (
  resolverWithoutStates,
  states = {},
  globalStates = {},
  mountNode = null
) => {
  const { path = "/", render, handlers, routeParams } = resolverWithoutStates;

  // render method. trim is required to avoid whitespaces during templating
  const routeToRender = hydrateToStateful(
    render,
    states,
    globalStates,
    routeParams
  ).trim();
  const ggId = makeid(12) + path.split("/").join("-");

  const layoutToRender = hydrateToStateful(
    renderHeader,
    {},
    globalStates
  ).trim();

  mountNode.innerHTML =
    layoutToRender + `<g-g id=${ggId}></g-g>` + routeToRender;

  const layoutElem = document.querySelector("header");
  resolveInternalHandlers(
    layoutElem,
    HeaderHandlers,
    states,
    globalStates,
    routeParams
  );

  // attach handlers to rendered html
  const ggTag = document.getElementById(ggId);

  if (ggTag) {
    const targetElem = ggTag.nextSibling;
    resolveInternalHandlers(
      targetElem,
      handlers,
      states,
      globalStates,
      routeParams
    );
  } else {
    console.error(`[Framework Error] no element found for ${ggId}`);
  }
};

const renderRoute = (resolver) => {
  const root = document.querySelector("main");

  const { states = {}, ...restResolver } = resolver || {};
  const globalStates = window.__BRBN_STORE;

  // route-level state
  const proxiedRouteStates = new Proxy(structuredClone(states), {
    set: (obj, prop, value) => {
      const prevValue = obj[prop];

      obj[prop] = value;

      if (prevValue !== value) {
        renderPage(restResolver, proxiedRouteStates, globalStates, root);
      }
      return true;
    },
  });

  // modifying global state
  window.addEventListener(GLOBAL_STORE_EVENT_SUBSCRIBER_NAME, (event) => {
    renderPage(restResolver, proxiedRouteStates, globalStates, root);
  });

  if (typeof resolver === "object") {
    renderPage(restResolver, proxiedRouteStates, globalStates, root);

    return;
  }

  renderPage(
    { render: () => `<div><h1>404</h1></div>` },
    proxiedRouteStates,
    globalStates,
    root
  );
};

const sanitizedPathFromQueryStrings = (urlWithQS) => {
  return urlWithQS.split("?")[0];
};

export const resolveRoute = (currentPathToResolve) => {
  let initialResolver = undefined;
  let searchQuery = undefined;

  if (currentPathToResolve.includes("?")) {
    searchQuery = Object.fromEntries(
      new URLSearchParams(currentPathToResolve.split("?")[1])
    );
  }

  if (!currentPathToResolve.includes("?") && typeof window !== "undefined") {
    searchQuery = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );
  }

  routes.forEach((route) => {
    // if path are as easy as exacts
    if (route.path === sanitizedPathFromQueryStrings(currentPathToResolve)) {
      initialResolver = { ...route, routeParams: { query: searchQuery } };
      return;
    }

    // only supports single dynamic path for now
    if (route.path.includes(":")) {
      const configPathSegments = route.path.split("/");
      // logic: match the exact strings, and let the wildcards as is
      const currentPathSegmentsToResolve = currentPathToResolve.split("/");

      const getDynamicPathParamKeys = configPathSegments
        .filter((p) => p.startsWith(":"))
        .map((p) => p.slice(1)); // trim the ":id"

      const getDynamicPathParamIndexes = configPathSegments
        .map((p, idx) => {
          if (p.startsWith(":")) {
            return idx;
          }
          return undefined;
        })
        .filter((p) => !!p);

      const getDynamicPathParamValues = getDynamicPathParamIndexes.map(
        (pIdx) => currentPathSegmentsToResolve[pIdx]
      );

      const paramsMap = getDynamicPathParamKeys.reduce(
        (curr, key, idx) => ({
          ...curr,
          [key]: getDynamicPathParamValues[idx],
        }),
        {}
      );

      // compare between exacts and dynamics
      // TODO: e.g. compare /search/:id/detail/:slug to /search/1/detail/random
      // for now, just "greedily" accepts the starts with only
      const trailingPath = route.path.slice(0, route.path.indexOf(":"));
      if (currentPathToResolve.startsWith(trailingPath)) {
        initialResolver = {
          ...route,
          routeParams: { ...paramsMap, query: searchQuery },
        };
      }
    }
  });

  return initialResolver;
};

export const initRouter = () => {
  // get initial path
  const path = window.location.pathname;

  renderRoute(resolveRoute(path));

  window.addEventListener("popstate", (event) => {
    const path = window.location.pathname;

    renderRoute(resolveRoute(path));
  });
};

export const router = {
  push: (path) => {
    window.history.pushState({}, "", path);

    renderRoute(resolveRoute(path));
  },
  replace: (path) => {
    window.history.replaceState({}, "", path);

    renderRoute(resolveRoute(path));
  },
  back: () => {
    window.history.back();
  },
};
