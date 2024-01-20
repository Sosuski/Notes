const express = require("express");
const router = express.Router();
const Users = require("../schemas/users.schema.js");
const registerController = require("../controllers/register.controller.js");

router.post("/register", registerController.Post);

module.exports = router;