const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const router = require("./app/router"); // Path relative to current file

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
