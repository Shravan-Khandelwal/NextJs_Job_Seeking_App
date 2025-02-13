const mongoose = require("mongoose");

async function connectWithDB(URL) {
  await mongoose
    .connect(URL)
    .then(() => {
      console.log("Connect With DB Success");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

module.exports = { connectWithDB };
