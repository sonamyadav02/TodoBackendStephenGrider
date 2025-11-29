const mongoose = require("mongoose");

const mongoDB =
  "mongodb+srv://kanu134:ieA4inkwk8deGCBl@cluster0.9sc3dbq.mongodb.net/todoSG"; //SG- stephenGrider

// const connection = async () => {
//   await mongoose.connect(mongoDB);
// };

var connection;

async function connectMongoDB() {
  connection = await mongoose.connect(mongoDB);
  console.log("Connected to Database!!");
}

try {
  connectMongoDB();
} catch (e) {
  console.log(e);
}

module.exports = { connection };
