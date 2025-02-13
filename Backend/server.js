const { App } = require("./App.js");
const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

App.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
