const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minLength: [3, "Length Should be more than 3 characters"],
    maxLength: [25, "Length Should be less than 25 characters"],
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
  Password: {
    type: String,
    required: true,
    minLength: [3, "Length Should be more than 3 characters"],
    maxLength: [95, "Length Should be less than 95 characters"],
  },
  Role: {
    type: String,
    required: true,
    enum: ["job seeker", "hiring manager"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  CompanyName: {
    type: String,
  },
  CompanyAppliedTo: [
    {
      JobId: {
        type: String,
        required: true,
      },
      Name: {
        type: String,
        required: true,
      },
      ApplicationResult: {
        type: String,
        enum: ["Selected", "Rejected", "Result Pending!"],
        required: true,
      },
    },
  ],
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = { userModel };
