const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../model/Model");
const Task = require("../model/taskModel");
const bcrypt = require("bcrypt");

const { resolveSoa } = require("dns");
const rounds = 10;

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

exports.task = (req, res) => {
  const task = new Task({
    maintask: req.body.maintask,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    description: req.body.description,
    status: req.body.status,
    subtask: [
      {
        subtask: req.body.subtask,
        substartdate: req.body.substartdate,
        subenddate: req.body.subenddate,
        subdescription: req.body.subdescription,
        substatus: req.body.substatus,
      },
    ],
  });

  task
    .save()
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task.",
      });
    });
};
exports.viewtask = (req, res) => {
  Task.find()
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    });
};

exports.edittask = (req, res) => {
  Task.findByIdAndUpdate(
    req.params.id,
    {
      maintask: req.body.maintask,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      description: req.body.description,
      status: req.body.status,
      subtask: [
        {
          subtask: req.body.subtask,
          substartdate: req.body.substartdate,
          subenddate: req.body.subenddate,
          subdescription: req.body.subdescription,
          substatus: req.body.substatus,
        },
      ],
    },
    {
      new: true,
    }
  ).then((task) => {
    if (!task) {
      return res.status(404).send({
        message: "Task not found with id " + req.params.id,
      });
    }
    res.send(task);
  });
};
exports.deletetask = (req, res) => {
  Task.findByIdAndRemove(req.params.id).then((task) => {
    if (!task) {
      return res.status(404).send({
        message: "Task not found with id " + req.params.id,
      });
    }
    res.send({
      message: "Task deleted successfully!",
    });
  });
};
