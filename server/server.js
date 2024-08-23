import express from "express";
import sqlite from "node:sqlite";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const db = new sqlite.DatabaseSync("db/db.sqlite3");

const dirName = path.dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(`${dirName}/../dist/index.html`));
});

app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.post("/api", (req, res) => {
  console.log(req.body);
  const data = req.body;
  db.exec(`
    INSERT INTO transactions
    (dateTime, author, sum, category, comment)
    VALUES
    (${data.date}, "${data.author}", ${data.sum}, "${data.category}", "${data.comment}");`);
  res.send("hello from api");
});

app.use("/assets/", express.static(path.resolve(`${dirName}/../dist/assets`)));

app.listen(8080, () => {
  console.log("listeting for port 8080");
});
