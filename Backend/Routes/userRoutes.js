const express = require("express");
const { isAuthorized } = require("../Middlewares/isAuthorized.js");
const {
  createUser,
  logInUser,
  logOutUser,
  getAllUsers,
  getCurrentUser,
  FindHRById,
  FetchCompaniesList,
} = require("../Controllers/userController.js");

const Router = express.Router();

Router.post("/createUser", createUser);
Router.post("/logInUser", logInUser);
Router.post("/logOutUser", logOutUser);
Router.get("/getAllUsers", isAuthorized, getAllUsers);
Router.get("/getCurrentUser", isAuthorized, getCurrentUser);
Router.get("/FindHRById/:HR_ID", isAuthorized, FindHRById);
Router.get("/FetchCompaniesList", isAuthorized, FetchCompaniesList);

module.exports = Router;
