const Thing = require("../../models/thing");

const productController = {
  postStuff: async (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({ ...req.body });
    thing
      // enregistre le Thing sur mongoDB
      .save()
      .then(() => res.status(201).json({ message: "Objet enregistré" }))
      .catch((error) => res.status(400).json({ error }));
  },
  getOneStuff: async (req, res, next) => {
    // recherche 1 Thing sur mongoDB
    Thing.findOne({ _id: req.params.id })
      .then((thing) => res.status(200).json(thing))
      .catch((error) => res.status(404).json({ error }));
  },
  patchOneStuff: async (req, res, next) => {
    // modifie 1 Thing sur mongoDB,  2ème argument avec les modifications à effectuer
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then((thing) => res.status(200).json({ message: "objet modifié" }))
      .catch((error) => res.status(400).json({ error }));
  },
  deleteOneStuff: async (req, res, next) => {
    // supprime 1 Thing sur mongoDB
    Thing.deleteOne({ _id: req.params.id })
      .then((thing) => res.status(200).json({ message: "objet supprimé" }))
      .catch((error) => res.status(400).json({ error }));
  },
  getAllStuff: async (req, res, next) => {
    // recherche tous les thing sur mongoDB
    Thing.find()
      .then((things) => res.status(200).json(things))
      .catch((error) => res.status(400).json({ error }));
  },
};

module.exports = productController;
