const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const cors=require('cors')
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(fileupload());
app.use(express.static("files"));
app.use(cors({origin:'http://localhost:8000', credentials : true}));
const dbCon = require("./src/config/Connection");
const authRoute = require("./src/routes/Routes")(app);

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
