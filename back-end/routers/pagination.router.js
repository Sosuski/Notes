const express = require('express');
const router = express.Router();
const Notes = require("../schemas/notes.schema.js");
const paginationController = require("../controllers/pagination.controller.js");

router.post("/pagination", paginationController.Post);

module.exports = router;