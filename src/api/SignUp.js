const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const path = require("path");
const User = require("../model/user");
const {
  resolveSoa
} = require("dns");
const rounds = 10;
exports.signup = (req, res) => {
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
        email: req.body.email,
        password: hash,
        role: "employee",
        token: null,
      });
      newUser
        .save()
        .then((user) => {
          res.status(200).send({
            data: [user],
            message: "Successfully created your account..!",
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
};

exports.viewemp = (req, res) => {
  User.find({
      role: "employee",
    })
    .then((users) => {
      res.status(200).send({
        data: [users],
        message: "Successfully fetched employees..!",
        success: true,
      });
    })
    .catch((err) => {
      res.status(404).send({
        data: [error],
        message: "Error..!",
        success: false,
      });
    });
};

exports.editemp = (req, res) => {
  bcrypt.hash(req.body.password, rounds, (error, hash) => {
    if (error) res.send(error);
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
            email: req.body.email,
            password: hash,
          }, {
            new: true,
          }
        )
        .then((user) => {
          res.status(200).send({
            data: [user],
            message: "Successfully fetched employees..!",
            success: true,
          });
        })
        .catch((error) => {
          return res.status(404).send({
            data: [],
            message: "employee not found with id " + req.params.id,
            success: false,
          });
        });
    }
  });
};

exports.deleteemp = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      res.status(200).send({
        data: [],
        message: "Successfully deleted employees..!",
        success: true,
      });
    })
    .catch((error) => {
      return res.status(404).send({
        data: [],
        message: "employee not found with id " + req.params.id,
        success: false,
      });
    });
};