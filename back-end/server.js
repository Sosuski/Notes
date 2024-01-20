const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Notes = require("./schemas/notes.schema.js");
const Users = require("./schemas/users.schema.js");
const jwt = require("jsonwebtoken");
const notesRouter = require("./routers/notes.router.js");
const paginationRouter = require("./routers/pagination.router.js");
const registerRouter = require("./routers/register.router.js");
const loginRouter = require("./routers/login.router.js");
const roleRouter = require("./routers/role.router.js");

server.use(express.json());
server.use(cors({ origin: "*" }));
server.use(notesRouter);
server.use(paginationRouter);
server.use(registerRouter);
server.use(loginRouter);
server.use(roleRouter);

mongoose.connect("mongodb://localhost:27017/Notes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  ("Connected successfully");
});

// router -> middleware -> controller

server.listen(8000, () => {
  ("Server is  on");
});
