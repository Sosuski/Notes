const express = require("express");
server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Notes = require("./schema.js")

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

server.post("/add", async (req,res) =>{
    console.log('there', req.body)
    let noteDoc = {
            title: req.body.title,
            description: req.body.description
        }

        const note = new Notes(noteDoc);  
        await note.save();

        res.json(noteDoc);
})


server.listen(8000, () => {
  ("Server is  on");
});
