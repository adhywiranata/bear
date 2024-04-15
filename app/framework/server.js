import { SSR_PERSISTOR_SCRIPT_ID } from "./constants.js";
import { resolveRoute } from "./router.js";

export const renderToHTMLString = (path) => {
  console.log({ path });
  const resolver = resolveRoute(path) || {};

  const { getServerSideStates, render, routeParams } = resolver;

  const serverStates =
    typeof getServerSideStates === "function"
      ? getServerSideStates()
      : undefined;

  return withServerStatePersistor(
    render({
      routeParams,
      serverStates,
    })
  )(serverStates);
};

const withServerStatePersistor = (htmlStr) => (serverStates) => {
  const serverStatesAsScript = serverStates
    ? `<script id="${SSR_PERSISTOR_SCRIPT_ID}" type="application/json">${JSON.stringify(
        serverStates
      )}</script>`
    : "";
  return htmlStr + serverStatesAsScript;
};
