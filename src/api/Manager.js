
const bcrypt = require("bcrypt");
const { resolveSoa } = require("dns");
const rounds = 10;

const User = require("../model/model");
exports.manager = (req, res) => {
    const newpath = __dirname + "/uploads/";
    const file = req.files.file;
    const filename = file.name;
  
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }
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
            file: req.files.file,
            email: req.body.email,
            password: hash,
            role: "manager",
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
    });
  };
  
  exports.viewmanager = (req, res) => {
    User.find({ role: "manager" })
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      });
  };
  
  exports.editmanager = (req, res) => {
    const newpath = __dirname + "/uploads/";
    const file = req.files.file;
    const filename = file.name;
  
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }
      bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if (error) res.send(error);
        else {
          User.findByIdAndUpdate(
            req.params.id,
            {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              gender: req.body.gender,
              age: req.body.age,
              address: req.body.address,
              qualification: req.body.qualification,
              designation: req.body.designation,
              mobilenumber: req.body.mobilenumber,
              file: req.files.file,
              email: req.body.email,
              password: hash,
            },
            {
              new: true,
            }
          ).then((user) => {
            if (!user) {
              return res.status(404).send({
                message: "User not found with id " + req.params.id,
              });
            }
            res.send(user);
          });
        }
      });
    });
  };
  
  exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send({
        message: "Manager deleted successfully!",
      });
    });
  };