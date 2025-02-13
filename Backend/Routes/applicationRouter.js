const express = require("express");
const {
  postApplication,
  getMyApplication,
  JobManagerGetAllJobApplications,
  jobSeekerDeleteApplication,
  AcceptJobApplication
} = require("../Controllers/applicationController.js");
const { isAuthorized } = require("../Middlewares/isAuthorized.js");

const Router = express.Router();

Router.get("/getMyApplication", isAuthorized, getMyApplication);

Router.get(
  "/JobManagerGetAllJobApplications",
  isAuthorized,
  JobManagerGetAllJobApplications
);

Router.post("/postApplication", isAuthorized, postApplication);

// FOR REJECTING THE USER JOB APPLICATION
Router.delete(
  "/jobSeekerDeleteApplication/:id",
  isAuthorized,
  jobSeekerDeleteApplication
);

// FOR ACCEPTING THE USER JOB APPLICATION
Router.post("/AcceptJobApplication/:id",isAuthorized,AcceptJobApplication);

module.exports = Router;
