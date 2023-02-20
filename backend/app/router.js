const express = require("express");
const router = express.Router();
const mainController = require("./mainController");

// paramétrage des routes
router.post("/api/stuff", mainController.postStuff);

router.get("/api/stuff/:id", mainController.getOneStuff);
router.put("/api/stuff/:id", mainController.patchOneStuff);
router.delete("/api/stuff/:id", mainController.deleteOneStuff);

router.get("/api/stuff", mainController.getAllStuff);

module.exports = router;
