import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import { renderToHTMLString } from "./framework/server.js";

const bearFrameworkApp = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// __bearframework__ is an abstract path which made to avoid conflicts with any of the page routes
bearFrameworkApp.use("/", express.static(path.join(__dirname, "./")));

bearFrameworkApp.get("*", (req, res) => {
  const htmlFile = fs.readFileSync(
    path.join(__dirname, "./index.html"),
    "utf-8"
  );

  if (req.path.startsWith("/favicon") || req.path.startsWith("/app")) {
    return res.send("");
  }

  const stringifiedApp = htmlFile.replace(
    "<main></main>",
    `<main>${renderToHTMLString(req.url)}</main>`
  );

  res.send(stringifiedApp);
});

bearFrameworkApp.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default bearFrameworkApp;
