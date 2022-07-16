const Task = require("../model/task");
const User = require("../model/user");
const tokenFn = require("../utils/common");

exports.addtask = async (req, res) => {
  let token = req.query.token;
  let result = await tokencheck(token);
  if (result) {
    const task = new Task({
      maintask: req.body.maintask,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      description: req.body.description,
      status: req.body.status,
      subtask: [{
        subtask: req.body.subtask,
        substartdate: req.body.substartdate,
        subenddate: req.body.subenddate,
        subdescription: req.body.subdescription,
        substatus: req.body.substatus,
        subtaskassignto: [req.body.subtaskassignto],
      }, ],
      assignto: [req.body.assignto],
    });

    task.save().then((task) => {
      res.status(200).send({
        data: [task],
        message: "Successfully added tasks..!",
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
exports.viewtask = async (req, res) => {
  const {
    token
  } = req.body;
  let result = await tokencheck(token);
  if (result) {
    Task.find().then((tasks) => {
      res.status(200).send({
        data: [tasks],
        message: "Successfully fetched tasks..!",
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

exports.edittask = async (req, res) => {
  let token = req.query.token;
  let result = await tokencheck(token);
  if (result) {
    Task.findByIdAndUpdate(
      req.params.id, {
        maintask: req.body.maintask,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        description: req.body.description,
        status: req.body.status,
        subtask: [{
          subtask: req.body.subtask,
          substartdate: req.body.substartdate,
          subenddate: req.body.subenddate,
          subdescription: req.body.subdescription,
          substatus: req.body.substatus,
          subtaskassignto: [req.body.subtaskassignto],
        }, ],
        assignto: [req.body.assignto],
      }, {
        new: true,
      }
    ).then((task) => {
      if (!task) {
        return res.status(404).send({
          data: [],
          message: "Task not found with id " + req.params.id,
          success: false,
        });
      }
      res.status(200).send({
        data: [task],
        message: "Successfully updated tasks..!",
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
exports.deletetask = async (req, res) => {
  let token = req.query.token;
  let result = await tokencheck(token);
  if (result) {
    Task.findByIdAndRemove(req.params.id).then((task) => {
      if (!task) {
        return res.status(404).send({
          data: [],
          message: "Task not found with id " + req.params.id,
          success: false,
        });
      }
      res.status(200).send({
        data: [task],
        message: "Successfully deleted tasks..!",
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

exports.filtertask = async (req, res) => {
  let token = req.query.token;
  let result = await tokencheck(token);
  if (result) {
    let statussearch = req.query.status;
    Task.find({
        status: statussearch,
      })
      .then((tasks) => {
        res.status(200).send({
          data: [tasks],
          message: "Successfully fetched tasks..!",
          success: true,
        });
      })
      .catch((err) => {
        res.status(500).send({
          data: [],
          message: "error in filtering.",
          success: false,
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