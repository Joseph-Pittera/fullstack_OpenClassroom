const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const app = express();

const router = require("./app/router"); // Path relative to current file

// paramétrage de mongoose, package qui facilite les interactions avec MongoDB
mongoose
  .connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json()); // To be able to read POST req.body content

app.set("port", process.env.PORT);
app.set("base_url", process.env.BASE_URL);

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

// Main router
app.use(router);

app.listen(app.get("port"), () => {
  console.log(`Listening on ${app.get("base_url")}:${app.get("port")}`);
});
