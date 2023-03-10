const express = require("express");
const app = express();
const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

// paramétrage de mongoose, package qui facilite les interactions avec MongoDB
mongoose
  .connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// paramétrage du CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/stuff", productRouter);
app.use("/api/auth", userRouter);

module.exports = app;
