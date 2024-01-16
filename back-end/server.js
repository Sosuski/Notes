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
    font: req.body.font,
    color: req.body.color,
  };
  console.log(noteDoc);
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
      description: req.body.description,
    },
  };
  const result = await Notes.updateOne(filter, updateDoc, options);
});

server.post("/delete", async (req, res) => {
  await Notes.deleteOne({ _id: req.body.Id });
});

server.post("/pagination", async (req, res) => {
  let notesPerPage = req.body.pages, pageIdx = req.body.idx, arr = [], docs = await Notes.find({}), pages = 0, pagesArr = [];
  // the amount of pages is docs.length / pages + 1 if docs.length%pages != 0
  if(docs.length > notesPerPage){
    if(docs.length % notesPerPage == 0){
      pages = docs.length / notesPerPage;
    } else pages = (docs.length / notesPerPage)+1;
  } else pages = 1
    for(let i = 1; i < pages; i++){
      pagesArr.push("");
    }
    for (let i = 0; i < notesPerPage; i++) {
      if(docs[notesPerPage*pageIdx+i] == null) break;
      arr.push(docs[notesPerPage*pageIdx+i]);
    }
    console.log(pagesArr)

  res.json({arr: arr, pageCnt: pagesArr})
}); 

server.listen(8000, () => {
  ("Server is  on");
});
