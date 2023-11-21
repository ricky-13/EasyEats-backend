// app config
// const cors = require("cors");
const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db");
mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// middleware
app.use(express.json());
// app.use(cors());
// might have to add fews lines from video if this doesnt work
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));

// api endpoints - making separate files for endpoints
app.get("/", (req, res) => {
  res.status(200).send("Easy Eats ricky!");
});

// listener
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
