// app config
const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db");
mongoDB();

// middleware
app.use(express.json());
app.use("/api", require("./routes/CreateUser"));

// api endpoints - making separate files for endpoints
app.get("/", (req, res) => {
  res.status(200).send("Easy Eats ricky!");
});

// listener
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
