const express = require("express");
const router = express.Router();
const mainController = require("./mainController");

// paramétrage des routes
router.get("/", mainController.getAllStuff);
router.post("/", mainController.postStuff);
router.get("/:id", mainController.getOneStuff);
router.put("/:id", mainController.patchOneStuff);
router.delete("/:id", mainController.deleteOneStuff);

module.exports = router;
