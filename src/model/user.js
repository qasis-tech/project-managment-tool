const mongoose = require("mongoose");
const { buffer } = require("stream/consumers");

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
    gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
    mobilenumber: {
    type: String,
    required: true,
  },
  imagefile: {
   data:Buffer,
   contentType: String
   
  },
  email: {
    type: String,
    required: true,
  },
    password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  token: {
    type: String,
      },
 
});

module.exports = mongoose.model("users", UserSchema);


