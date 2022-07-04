const bcrypt = require("bcrypt");
const { resolveSoa } = require("dns");
const multer = require("multer");
const rounds = 10;

const User = require("../model/user");
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("imagefile");

exports.manager = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
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
            role: "manager",
            token: " ",
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
    }
  });
};

exports.viewmanager = (req, res) => {
  User.find({ role: "manager" })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving managers.",
      });
    });
};

exports.editmanager = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
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
              imagefile: req.file.path,
              email: req.body.email,
              password: hash,
            },
            {
              new: true,
            }
          ).then((user) => {
            if (!user) {
              return res.status(404).send({
                message: "manager not found with id " + req.params.id,
              });
            }
            res.send(user);
          });
        }
      });
    }
  });
};

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "manager not found with id " + req.params.id,
      });
    }
    res.send({
      message: "Manager deleted successfully!",
    });
  });
};
