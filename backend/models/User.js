const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // permet d'avoir des adresses mails uniques
  password: { type: String, required: true },
});

// permet d'avoir des erreurs Mongo plus compréhensibles
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
