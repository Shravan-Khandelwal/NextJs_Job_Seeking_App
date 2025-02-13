const bcrypt  = require("bcrypt");

//! Function For hashing The Password
async function hashPassword(Password) {
  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

async function comparePassword(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
}

module.exports = { hashPassword, comparePassword };
