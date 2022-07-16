const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  maintask: {
    type: String,
    required: true,
  },
  startdate: {
    type: Date,
    default: Date.now,
  },
  enddate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  subtask: [{
    subtask: {
      type: String,
      required: true,
    },
    substartdate: {
      type: Date,
      default: Date.now,
    },
    subenddate: {
      type: Date,
      default: Date.now,
    },
    subdescription: {
      type: String,
      required: true,
    },
    substatus: {
      type: String,
      required: true,
    },
    subtaskassignto: {
      type: Array,
      required: true,
    },
  }, ],
  assignto: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("tasks", taskSchema);