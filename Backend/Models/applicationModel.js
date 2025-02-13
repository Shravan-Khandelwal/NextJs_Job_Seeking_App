const mongoose = require("mongoose");
const validator = require("validator");

const applicationSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minLength: [3, "Length Should be more than 3 characters"],
    maxLength: [25, "Length Should be less than 25 characters"],
  },
  Address: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  Phone: {
    type: Number,
    required: true,
  },
  coverLetter: {
    type: String,
    required: true,
  },
  applicantInfo: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    Role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  ManagerInfo: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    Role: {
      type: String,
      enum: ["hiring manager"],
      required: true,
    },
  },
  Resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  JobId: {
    type: String,
    required: true,
  },
});

const applicationModel = mongoose.model("applicationModel", applicationSchema);
module.exports = { applicationModel };
