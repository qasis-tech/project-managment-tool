const bcrypt = require("bcrypt");
const {
  resolveSoa
} = require("dns");
const tokenFn = require("../utils/common");
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

exports.manager = async (req, res) => {
  let token = req.query.token;
  let result = await tokencheck(token);
  if (result) {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        bcrypt.hash(req.body.password, rounds, (error, hash) => {
          if (error)
            res.status(404).send({
              data: [error],
              message: "Error..!",
              success: false,
            });
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
              token: null,
            });

            newUser
              .save()
              .then((user) => {
                res.status(200).send({
                  data: [user],
                  message: "Successfully added manager..!",
                  success: true,
                });
              })
              .catch((error) => {
                res.status(404).send({
                  data: [error],
                  message: "Error..!",
                  success: false,
                });
              });
          }
        });
      }
    });
  } else {
    res.status(404).send({
      data: [],
      message: "User not found..!",
      success: false,
    });
  }
};

exports.viewmanager = async (req, res) => {
  let token = req.query.token;
  let result = await tokencheck(token);
  if (result) {
    User.find({
      role: "manager",
    }).then((users) => {
      res.status(200).send({
        data: [users],
        message: "Successfully fetched managers..!",
        success: true,
      });
    });
  } else {
    res.status(404).send({
      data: [],
      message: "User not found..!",
      success: false,
    });
  }
};

exports.editmanager = async (req, res) => {
  let token = req.query.token;
  let result = await tokencheck(token);
  if (result) {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        bcrypt.hash(req.body.password, rounds, (error, hash) => {
          if (error)
            res.status(404).send({
              data: [error],
              message: "Error..!",
              success: false,
            });
          else {
            User.findByIdAndUpdate(
              req.params.id, {
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
              }, {
                new: true,
              }
            ).then((user) => {
              if (!user) {
                return res.status(404).send({
                  data: [],
                  message: "manager not found with id " + req.params.id,
                  success: false,
                });
              }
              res.status(200).send({
                data: [user],
                message: "Successfully updated manager details..!",
                success: true,
              });
            });
          }
        });
      }
    });
  } else {
    res.status(404).send({
      data: [],
      message: "User not found..!",
    });
  }
};

exports.delete = async (req, res) => {
  let token = req.query.token;
  let result = await tokencheck(token);
  if (result) {
    User.findByIdAndRemove(req.params.id).then((user) => {
      if (!user) {
        return res.status(404).send({
          data: [],
          message: "manager not found with id " + req.params.id,
          success: false,
        });
      }
      res.status(200).send({
        data: [],
        message: "Manager deleted successfully!",
        success: true,
      });
    });
  } else {
    res.status(404).send({
      data: [],
      message: "User not found..!",
      success: false,
    });
  }
};