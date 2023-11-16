const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://ahujashaurya13:3vrsjxxgpM1lXrHt@cluster0.wg9ivqi.mongodb.net/easyEats-mern?retryWrites=true&w=majority";

const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true });
  console.log("Connected to MongoDB");

  const fetched_data = await mongoose.connection.db.collection("food_items");
  const data = await fetched_data.find({}).toArray();

  global.food_items = data;
  console.log(global.food_items);
};

module.exports = mongoDB;

// try {
//   await mongoose.connect(mongoURI);
//   console.log("Connected to MongoDB");

//   const dbo = mongoose.connection.db;
//   const dbi = dbo.db("easyeats-mern");

//   const fetched_data = dbi.collection("food_items");
//   const fdata = await fetched_data.find({});
//   const adata = await fdata.toArray();

//   console.log(adata);

//   // global.food_items = data;
//   // console.log(global.food_items);
// } catch (err) {
//   console.error("Error connecting to MongoDB:", err);
// }

module.exports = mongoDB;
// const mongoDB = async () => {
//   await mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log("connected to db");

//   const db1 = mongoose.connection.db;

//   // const dbo = db1.db("easyEats-mern");
//   const data = await db1.collection("food_items").find({}).toArray();

//   console.log(data);

// const fetched_data = mongoose.connection.db.collection(
//   "easyEats-mern.food_items"
// );
// console.log(fetched_data);
//   const data = await mongoose.connection.db
//     .collection("food_items")
//     .find({})
//     .toArray();
// console.log(data);
//   global.food_items = data;
//   console.log(global.food_items);
// } catch (err) {
//   console.error("Error connecting to db : ", err);
// }

// const mongoDB = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log("Connected to MongoDB");

//     const fetched_data = await mongoose.connection.db.collection("food_items");
//     const data = await fetched_data.find({}).toArray();

//     global.food_items = data;
//     console.log(global.food_items);
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//   }
// };
