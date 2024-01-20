const Notes = require("../schemas/notes.schema.js");

const Post = async (req, res) => {
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
};

const Get = async (req, res) => {
  let docs = await Notes.find({});
  console.log(docs);
  res.json(docs);
};

const Patch = async (req, res) => {
  const filter = { _id: req.body.Id };
  const options = { upsert: false };
  const updateDoc = {
    $set: {
      title: req.body.title,
      description: req.body.description,
      font: req.body.font,
      color: req.body.color
    },
  };
  const result = await Notes.updateOne(filter, updateDoc, options);
  const user = await Notes.findOne({ _id: req.body.Id });
  console.log(user)
};

const Delete = async (req, res) => {
  await Notes.deleteOne({ _id: req.body.Id });
};

module.exports = {
  Get,
  Post,
  Delete,
  Patch,
};
