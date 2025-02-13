const mongoose = require("mongoose");
const validator = require("validator");

const jobSchema = new mongoose.Schema({
  JobTitle: {
    type: String,
    required: true,
    minLength: [3, "Length Should be more than 3 characters"],
    maxLength: [50, "Length Should be less than 50 characters"],
  },
  JobDescription: {
    type: String,
    required: true,
    minLength: [3, "Length Should be more than 3 characters"],
    maxLength: [350, "Length Should be less than 350 characters"],
  },
  fixedSalary: {
    type: Number,
    required: true,
    minLength: [4, "Length Should be more than 4 characters"],
    maxLength: [9, "Length Should be less than 9 characters"],
  },
  JobCategory: {
    type: String,
    required: true,
  },
  JobLocation: {
    type: String,
    required: true,
  },
  JobExpired: {
    type: Boolean,
    default: false,
  },
  JobPostedOn: {
    type: Date,
    default: Date.now(),
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: true,
  },
  Job_Company_Name: {
    type: String,
    required: true,
  },
});

const jobModel = mongoose.model("jobModel", jobSchema);

module.exports = { jobModel };
