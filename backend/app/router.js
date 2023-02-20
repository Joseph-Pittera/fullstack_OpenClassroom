const express = require("express");
const router = express.Router();
const mainController = require("./mainController");

router.get("/api/products/:id", mainController.getOne);
router.get("/api/products", mainController.getAll);
router.post("/api/products", mainController.createOne);
router.put("/api/products/:id", mainController.modifyOne);
router.delete("/api/products/:id", mainController.deleteOne);

module.exports = router;
