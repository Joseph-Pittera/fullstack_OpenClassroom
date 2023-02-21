const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// paramétrage des routes
productRouter.get('/', auth, productController.getAll);
productRouter.post('/', auth, multer, productController.createOne);
productRouter.get('/:id', auth, productController.getOne);
productRouter.put('/:id', auth, multer, productController.modifyOne);
productRouter.delete('/:id', auth, productController.deleteOne);

module.exports = productRouter;
