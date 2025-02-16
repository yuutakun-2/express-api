const express = require("express");
const app = express();
// require("express-ws")(app);
// const { wsRouter } = require("./routers/ws");
// app.use(wsRouter);

// const { createServer } = require("@vercel/node");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cors = require("cors");
app.use(
  cors({
    origin: ["https://react-app-iota-rose.vercel.app"],
    credentials: true,
  })
);

const { usersRouter } = require("../routers/users");
const { postsRouter } = require("../routers/posts");
const { commentsRouter } = require("../routers/comments");
app.use(postsRouter);
app.use(usersRouter);
app.use(commentsRouter);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(8080, () => {
  console.log("Express API running at 8080");
});

module.exports = app;
