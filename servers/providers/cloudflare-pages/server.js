import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";

import { renderServerRoute } from "../../handlers.js";

const app = new Hono();

app.use("/app/*", serveStatic({ root: "./" }));
app.get("*", (c) => {
  return renderServerRoute(c);
});

export default app;
