import { routes } from "../routes/index.js";

import {
  STORE_EVENT_SUBSCRIBER_NAME,
  ROUTER_RENDER_SUBCRIBER_NAME,
} from "./constants.js";
import { renderPage } from "./renderer.js";

const sanitizeRouterPath = (urlWithQSAndHash) => {
  const cleanedFromQS = urlWithQSAndHash.split("?")[0];
  const cleanedFromHash = cleanedFromQS.split("#")[0];
  return cleanedFromHash;
};

// { #hashKeyName: value } => { hashKeyName: value }
const sanitizeHashKeyFromHashMap = (obj) => {
  return Object.keys(obj).reduce((curr, v) => {
    return {
      ...curr,
      [v.slice(1)]: obj[v],
    };
  }, {});
};

export const resolveRoute = (currentPathToResolve) => {
  let initialResolver = undefined;

  const routerPath = currentPathToResolve;
  let searchQuery = undefined;
  let searchHash = undefined;

  if (currentPathToResolve.includes("?")) {
    searchQuery = Object.fromEntries(
      new URLSearchParams(currentPathToResolve.split("?")[1])
    );
    searchHash = sanitizeHashKeyFromHashMap(
      Object.fromEntries(
        new URLSearchParams(currentPathToResolve.split("#")[1])
      )
    );
  }

  if (!currentPathToResolve.includes("?") && typeof window !== "undefined") {
    searchQuery = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );
    searchHash = sanitizeHashKeyFromHashMap(
      Object.fromEntries(new URLSearchParams(window.location.hash))
    );
  }

  const routerSignature = {
    path: routerPath,
    query: searchQuery,
    hash: searchHash,
  };

  routes.forEach((route) => {
    // if path are as easy as exacts
    if (route.path === sanitizeRouterPath(currentPathToResolve)) {
      initialResolver = {
        ...route,
        router: routerSignature,
      };
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
          router: {
            params: { ...paramsMap },
            ...routerSignature,
          },
        };
      }
    }
  });

  return initialResolver;
};

const renderRoute = (initialResolver, mountNode) => {
  const root = document.querySelector(mountNode);

  const { states = {}, ...restResolver } = initialResolver || {};
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
  window.addEventListener(STORE_EVENT_SUBSCRIBER_NAME, (event) => {
    renderPage(restResolver, proxiedRouteStates, globalStates, root);
  });

  if (typeof initialResolver === "object") {
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

export const initRouter = ({ mountNode }) => {
  // get initial path
  const path = window.location.pathname;

  renderRoute(resolveRoute(path), mountNode);

  window.addEventListener("popstate", () => {
    const path = window.location.pathname;

    renderRoute(resolveRoute(path), mountNode);
  });

  window.addEventListener(ROUTER_RENDER_SUBCRIBER_NAME, (event) => {
    renderRoute(resolveRoute(event.detail.path), mountNode);
  });
};

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
