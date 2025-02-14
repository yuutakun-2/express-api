const express = require("express");
const app = express();
require("express-ws")(app);
const { wsRouter } = require("./routers/ws");
app.use(wsRouter);

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cors = require("cors");
app.use(
  cors({
    origin: ["https://yuuta-react-app.vercel.app"],
    credentials: true,
  })
);

const { usersRouter } = require("./routers/users");
const { postsRouter } = require("./routers/posts");
const { commentsRouter } = require("./routers/comments");
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

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Express API started at port ${PORT}...`);
  });
}

module.exports = app;
