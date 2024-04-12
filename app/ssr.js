import { SSR_PERSISTOR_SCRIPT_ID } from "./framework/constants.js";
import { resolveRoute } from "./lib/router.js";

export const getStringifiedApp = (path) => {
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
  const serverStatesAsScript = `<script id="${SSR_PERSISTOR_SCRIPT_ID}" type="application/json">${JSON.stringify(
    serverStates
  )}</script>`;
  return htmlStr + serverStatesAsScript;
};
