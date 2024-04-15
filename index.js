import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { handle } from "@hono/node-server/vercel";

import { renderToHTMLString } from "./app/framework/server.js";
import { htmlShell } from "./servers/template.js";

const app = new Hono();

app.use("/app/*", serveStatic({ root: "./" }));
app.get("*", (c) => {
  if (c.req.path.includes("favicon") || c.req.path.includes("/app/")) {
    c.header("X-Bear-Framework", "Non SSR Page");
    return c.text("Ok");
  }

  const stringifiedApp = htmlShell().replace(
    "<main></main>",
    `<main>${renderToHTMLString(c.req.path)}</main>`
  );

  c.header("X-Bear-Framework", "Yes");
  return c.html(stringifiedApp);
});

serve(app);

export default handle(app);
