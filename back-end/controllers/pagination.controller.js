const Notes = require("../schemas/notes.schema.js");

const Post = async (req, res) => {
  console.log("here", req.body.perPage);
  let notesPerPage = req.body.perPage,
    pageIdx = req.body.idx,
    arr = [],
    docs = await Notes.find({}),
    pages = 0,
    pagesArr = [];

  pages = Math.ceil((docs.length * 1.0) / notesPerPage);

  for (let i = 0; i < pages; i++) pagesArr.push("");

  for (
    let i = 0;
    i < notesPerPage && notesPerPage * pageIdx + i < docs.length;
    i++
  )
    arr.push(docs[notesPerPage * pageIdx + i]);

  res.json({ arr: arr, pageCnt: pagesArr });
};

module.exports = {
  Post,
};
