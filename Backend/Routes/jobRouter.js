const express = require("express");
const {
  getAllJobs,
  postJob,
  expireJob,
  getMyJobs,
  FindJobByID,
} = require("../Controllers/jobController.js");
const { isAuthorized } = require("../Middlewares/isAuthorized.js");

const Router = express.Router();

Router.get("/getAllJobs", isAuthorized, getAllJobs);
Router.post("/postJob", isAuthorized, postJob);
Router.delete("/expireJob/:Id", isAuthorized, expireJob);
Router.get("/getMyJobs", isAuthorized, getMyJobs);
Router.get("/FindJobByID/:id", isAuthorized, FindJobByID);

module.exports = Router;
