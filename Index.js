const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
const dbCon = require("./src/config/connection");
const authRoute = require("./src/routes/routes")(app);
const port = 7000;
app.listen(port, () => {
  console.log("Server is listening on port ", port);
});