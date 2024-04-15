import { renderToHTMLString } from "../app/framework/server.js";
import { htmlShell } from "./template.js";

export const renderServerRoute = (c) => {
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
};
