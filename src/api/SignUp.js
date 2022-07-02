const bcrypt = require("bcrypt");
const path = require("path");
const User = require("../model/user");
const { resolveSoa } = require("dns");
const rounds = 10;
// const multer = require('multer');
//  const upload = multer({dest:'uploads/'}).single("imagefile");
exports.signup = (req, res) => {

//   upload(req, res, (err) => {
//     if(err) {
//       res.status(400).send("Something went wrong!");
//     }
//     res.send(req.file);
//    });
//   const storage = multer.diskStorage({   
//     destination: function(req, file, cb) { 
//        cb(null, './uploads');    
//     }, 
//     filename: function (req, file, cb) { 
//        cb(null , file.originalname);   
//     }
//  });

  bcrypt.hash(req.body.password, rounds, (error, hash) => {
    if (error) res.send(error);
    else {
     
      const newUser = User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        age: req.body.age,
        address: req.body.address,
        qualification: req.body.qualification,
        designation: req.body.designation,
        mobilenumber: req.body.mobilenumber,
        imagefile: req.file.path,
        email: req.body.email,
        password: hash,
        role: "employee",
        token:" "
      });
      newUser
        .save()
        .then((user) => {
          res.send(user);
        })
        .catch((error) => {
          res.send(error);
        });
    }
  });
};
