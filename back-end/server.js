const express = require("express");
server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Notes = require("./schema.js");

server.use(express.json());
server.use(cors({ origin: "*" }));

mongoose.connect("mongodb://localhost:27017/Notes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  ("Connected successfully");
});

server.post("/add", async (req, res) => {
  console.log("there", req.body);
  let noteDoc = {
    title: req.body.title,
    description: req.body.description,
  };

  const note = new Notes(noteDoc);
  await note.save();

  res.json(noteDoc);
});

server.get("/notes", async (req, res) => {
  let docs = await Notes.find({});
  console.log(docs);
  res.json(docs);
});

server.post("/edit", async (req, res) => {
  const filter = { _id: req.body.Id };
  const options = { upsert: false };
  const updateDoc = {
    $set: {
      title: req.body.title,
      description: req.body.description
    },
  };
  const result = await Notes.updateOne(filter, updateDoc, options);
});

server.post("/delete", async (req, res) => {
    await Notes.deleteOne({ _id: req.body.Id });
})

server.listen(8000, () => {
  ("Server is  on");
});
