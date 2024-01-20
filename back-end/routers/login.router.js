const express = require("express");
const router = express.Router();
const Users = require("../schemas/users.schema.js");
const loginController = require("../controllers/login.controller");

router.post("/login", loginController.Post);

module.exports = router;