const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/User");

const userController = {
  signup: async (req, res, next) => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      await user.save();
      res.status(201).json({ message: "Utilisateur créé" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user === null) {
        return res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" });
      }
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" });
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
          expiresIn: "24h",
        }),
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

module.exports = userController;
