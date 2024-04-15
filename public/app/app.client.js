import { initApp } from "./framework/init.js";

// init = () =>

initApp({
  mountNode: "main",
  initialStore: {
    username: undefined,
  },
});
