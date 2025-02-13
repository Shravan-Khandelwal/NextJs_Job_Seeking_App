const jwt = require("jsonwebtoken");

async function GenerateToken(userData, res, next) {
  try {
    const token = jwt.sign({ userData }, process.env.JWT_SECRET_KEY);
    const option = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
    res.cookie("token", token, option);
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return next(error);
  }
}

module.exports = { GenerateToken };
