const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const router = express.Router();
const multer = require("multer");
const path=require('path')

const bcrypt = require("bcrypt");
const cors = require("cors");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(fileupload());
app.use(express.static("files"));
app.use('/uploads',express.static('uploads'))
app.use(cors({ origin: "http://localhost:8000", credentials: true }));
const dbCon = require("./src/config/connection");
const authRoute = require("./src/routes/routes")(app);

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
