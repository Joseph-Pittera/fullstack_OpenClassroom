const mongoose = require('mongoose');

// création d'un Shema de données pour mongoDB
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

// la méthode .model transforme un schema en modeèle utilisable
module.exports = mongoose.model('Thing', thingSchema);