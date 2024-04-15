import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { handle } from "@hono/node-server/vercel";

import { renderServerRoute } from "../handlers.js";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/");

app.use("/app/*", serveStatic({ root: "./" }));
app.get("*", (c) => {
  return renderServerRoute(c);
});

export default handle(app);
