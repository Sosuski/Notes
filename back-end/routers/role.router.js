const express = require("express");
const router = express.Router();
const Users = require("../schemas/users.schema");
const roleController = require("../controllers/role.controller");
const adminReqMiddleware = require("../middlewares/handleAdminCreate.middleware");

router.post("/role", adminReqMiddleware.handleAdminReq, roleController.Post);

module.exports = router;