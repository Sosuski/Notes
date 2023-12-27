const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Notes", notesSchema);