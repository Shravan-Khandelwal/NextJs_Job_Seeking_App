const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/userMode.js");

async function isAuthorized(req, res, next) {
  const token = req.cookies?.token;

  // console.log(token);
  
  if (!token) {
    return res.status(400).json({
      message: "Invalid authorization",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userInDB = await userModel.findById(decoded.userData.id);
  // console.log(userInDB);
  
  req.user = userInDB;
  next();
}

module.exports = { isAuthorized };
