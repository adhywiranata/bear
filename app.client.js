import { initApp } from "./framework/init.js";

initApp({
  mountNode: "main",
  initialStore: {
    username: undefined,
  },
});
