const Thing = require('../../models/thing');
const fs = require('fs');

const productController = {
  createOne: async (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    delete thingObject._userId;
    const thing = new Thing({
      ...thingObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    });
    try {
      await thing.save();
      res.status(201).json({ message: 'Objet enregistré !' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  getOne: async (req, res, next) => {
    // recherche 1 Thing sur mongoDB
    Thing.findOne({ _id: req.params.id })
      .then((thing) => res.status(200).json(thing))
      .catch((error) => res.status(404).json({ error }));
  },
  modifyOne: async (req, res, next) => {
    // vérifie si une image est présente et adapte la réponse en conséquence
    const thingObject = req.file
      ? {
          ...JSON.parse(req.body.thing),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    delete thingObject._userId;
    try {
      const thing = await Thing.findOne({ _id: req.params.id });
      if (thing.userId != req.auth.userId) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      await Thing.updateOne(
        { _id: req.params.id },
        { ...thingObject, _id: req.params.id }
      );
      res.status(200).json({ message: 'Objet modifié!' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  deleteOne: async (req, res, next) => {
    try {
      const thing = await Thing.findOne({ _id: req.params.id });
      if (thing.userId != req.auth.userId) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, async () => {
        try {
          await Thing.deleteOne({ _id: req.params.id });
          res.status(200).json({ message: 'Object supprimé !' });
        } catch (error) {
          res.status(401).json({ error });
        }
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  getAll: async (req, res, next) => {
    // recherche tous les thing sur mongoDB
    Thing.find()
      .then((things) => res.status(200).json(things))
      .catch((error) => res.status(400).json({ error }));
  },
};

module.exports = productController;
