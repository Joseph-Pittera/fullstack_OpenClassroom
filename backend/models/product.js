const mongoose = require("mongoose");

// création d'un Shema de données pour mongoDB
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// la méthode .model transforme un schema en modeèle utilisable
module.exports = mongoose.model("Product", productSchema);
