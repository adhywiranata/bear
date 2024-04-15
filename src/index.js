// import { Hono } from "hono";
// import { serveStatic } from "hono/cloudflare-workers";
// import { renderServerRoute } from "../servers/handlers";

// const app = new Hono();

// app.use("/app/*", serveStatic({ root: "./" }));
// app.get("/", (c) => {
//   return renderServerRoute(c);
// });

// export default app;
import { Hono } from "hono";
import { renderer } from "./renderer";

const app = new Hono();

app.get("*", renderer);

app.get("/", (c) => {
  return c.render(<h1>Hello, Cloudflare Pages!</h1>);
});

export default app;
