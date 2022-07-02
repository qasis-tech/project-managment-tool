const Task = require("../model/task");
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
        subtaskassignto:[req.body.subtaskassignto]
      },
    ],
    assignto:[req.body.assignto]
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
          subtaskassignto:[req.body.subtaskassignto]
        },
      ],
      assignto:[req.body.assignto]

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

exports.filtertask = (req, res) => {
  let statussearch=req.query.status
   Task.find({status: statussearch}) 
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error in filtering.",
      });
    });
 };
  