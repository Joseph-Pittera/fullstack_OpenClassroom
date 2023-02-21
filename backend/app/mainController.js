const Product = require("../models/product");

const mainController = {
  getAll: async (req, res, next) => {
    // recherche tous les products sur mongoDB
    Product.find()
      .then((products) => res.status(200).json({ products }))
      .catch((error) => res.status(400).json({ error }));
  },
  createOne: async (req, res, next) => {
    const product = new Product({ ...req.body });
    console.log("test", product);

    product
      // enregistre le Product sur mongoDB
      .save()
      .then((product) => res.status(201).json({ product }))
      .catch((error) => res.status(400).json({ error }));
  },
  getOne: async (req, res, next) => {
    // recherche 1 Product sur mongoDB
    Product.findOne({ _id: req.params.id })
      .then((product) => res.status(200).json({ product }))
      .catch((error) => res.status(404).json({ error }));
  },
  modifyOne: async (req, res, next) => {
    // modifie 1 Product sur mongoDB,  2ème argument avec les modifications à effectuer
    Product.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    )
      .then((product) => res.status(200).json({ message: "Modified!" }))
      .catch((error) => res.status(400).json({ error }));
  },
  deleteOne: async (req, res, next) => {
    // supprime 1 Product sur mongoDB
    Product.deleteOne({ _id: req.params.id })
      .then((product) => res.status(200).json({ message: "Deleted!" }))
      .catch((error) => res.status(400).json({ error }));
  },
};

module.exports = mainController;
