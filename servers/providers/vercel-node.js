import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { handle } from "@hono/node-server/vercel";

import { renderServerRoute } from "../handlers.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const app = new Hono().basePath("/");

app.use("/app/*", serveStatic({ root: "./" }));
app.get("*", (c) => {
  return renderServerRoute(c);
});

export default handle(app);
