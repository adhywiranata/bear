import { SSR_PERSISTOR_SCRIPT_ID } from "./constants.js";

export const resolveHandlebars = (s) => s.match(/\{\{([^{}]+)\}\}/g);

export const hydrateToStateful = ({ renderer, states, store, router }) => {
  const replacableMatchers = [];

  let serverStates = undefined;

  try {
    serverStates = JSON.parse(
      document.getElementById(SSR_PERSISTOR_SCRIPT_ID).textContent
    );
  } catch (err) {}

  let htmlString = renderer({ states, store, router, serverStates });
  const matchers = resolveHandlebars(htmlString);

  const storeStatesKeys = Object.keys(store).map((gs) => `store.${gs}`);

  if (!!matchers && matchers.length > 0) {
    matchers.forEach((matcher) => {
      let matched = 0;

      Object.keys(states).forEach((stateKey) => {
        const matcherTrimmed = matcher.slice(2, matcher.length - 2);
        const stateVal = states[stateKey];

        if (
          matcherTrimmed === stateKey &&
          typeof stateVal !== "undefined" &&
          stateVal !== null
        ) {
          replacableMatchers.push({
            key: matcher,
            value: stateVal,
          });

          matched += 1;
        }
      });

      storeStatesKeys.forEach((stateKey) => {
        const matcherTrimmed = matcher.slice(2, matcher.length - 2);
        const stateVal = store[stateKey.replace("store.", "")];

        if (
          matcherTrimmed === stateKey &&
          typeof stateVal !== "undefined" &&
          stateVal !== null
        ) {
          replacableMatchers.push({
            key: matcher,
            value: stateVal,
          });

          matched += 1;
        }
      });

      // if no matches found
      if (matched === 0) {
        replacableMatchers.push({
          key: matcher,
          value: "",
        });
      }
    });

    replacableMatchers.forEach((matcherToReplace) => {
      htmlString = htmlString.replaceAll(
        matcherToReplace.key,
        matcherToReplace.value
      );
    });
  }

  return htmlString;
};
