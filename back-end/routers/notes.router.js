const express = require("express");
const router = express.Router();
const Notes = require("../schemas/notes.schema.js");
const notesController = require("../controllers/notes.controller.js");
const adminReqMiddleware = require("../middlewares/handleAdminCreate.middleware.js");

router.post("/notes", adminReqMiddleware.handleAdminReq, notesController.Post);

router.get("/notes", notesController.Get);

router.patch("/notes", adminReqMiddleware.handleAdminReq, notesController.Patch);

router.delete("/notes", adminReqMiddleware.handleAdminReq, notesController.Delete);

module.exports = router;
