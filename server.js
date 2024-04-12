import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { getStringifiedApp } from "./app/ssr.js";

const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use("/app", express.static(path.join(__dirname, "./app")));

app.get("*", (req, res) => {
  const htmlFile = fs.readFileSync(
    path.join(__dirname, "./index.html"),
    "utf-8"
  );

  if (req.path.startsWith("/favicon")) {
    return res.send("");
  }

  const stringifiedApp = htmlFile.replace(
    "<main></main>",
    `<main>${getStringifiedApp(req.path)}</main>`
  );

  res.send(stringifiedApp);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
