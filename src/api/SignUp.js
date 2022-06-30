const bcrypt = require("bcrypt");
const path=require('path')
const User = require("../model/model");
const { resolveSoa } = require("dns");
const rounds = 10;
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
      if (error) res.send(error);
      else {
        // const newUser = User({
        //   firstname: req.body.firstname,
        //   lastname: req.body.lastname,
        //   gender: req.body.gender,
        //   age: req.body.age,
        //   address: req.body.address,
        //   qualification: req.body.qualification,
        //   designation: req.body.designation,
        //   mobilenumber: req.body.mobilenumber,
        //   imagefile:req.file.path,
        //   email: req.body.email,
        //   password: hash,
        //   role: "employee",
        // })
        console.log(req.file)
        // newUser
        //   .save()
        //   .then((user) => {
        //     res.send(user);
        //   })
        //   .catch((error) => {
        //     res.send(error);
        //   });
      }
    });

};
