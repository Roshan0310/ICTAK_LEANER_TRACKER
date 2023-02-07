const mongoose = require("mongoose");

const leanerSchema = new mongoose.Schema({
  learnerId: {
    type: String,
    required: [true, "Please enter learner_id"],
  },
  learnerName: {
    type: String,
    required: [true, "Please enter name of the learner"],
  },
  courseName: {
    type: String,
    enum: ["FSD", "DSA", "ML-AI", "RPA", "ST", "CSA"],
    required: [true,"Please select any couse"],
  },
  project: {
    type: String,
    enum: ["ICTAK", "KKEM", "NORKA", "KDISC"],
    required: [true,"Please select project"],
  },
  batch: {
    type: String,
    enum: ["May_22", "Jun_22", "Jul_22", "Aug_22","Oct_22"],
    required: [true,"Please select the batch"],
  },
  courseStatus: {
    type: String,
    enum: ["Qualified", "Incomplete"],
    required: [true,"Please select the status of the course"],
    default: "enrolled"
  },
  placementStatus: {
    type: String,
    enum: ["Placed","Job Seeking","Not Interested"],
    required : [true,"Please select the placement status"],
  }
});

module.exports = mongoose.model("Learner", leanerSchema);
