const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://ahujashaurya13:3vrsjxxgpM1lXrHt@cluster0.wg9ivqi.mongodb.net/?retryWrites=true&w=majority";

const mongoDB = () => {
  mongoose.connect(mongoURI);
};

module.exports = mongoDB;
