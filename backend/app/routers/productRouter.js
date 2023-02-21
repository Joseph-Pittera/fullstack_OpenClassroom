const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");

// paramétrage des routes
productRouter.get("/", auth, productController.getAllStuff);
productRouter.post("/", auth, productController.postStuff);
productRouter.get("/:id", auth, productController.getOneStuff);
productRouter.put("/:id", auth, productController.patchOneStuff);
productRouter.delete("/:id", auth, productController.deleteOneStuff);

module.exports = productRouter;
