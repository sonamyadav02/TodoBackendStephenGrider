const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: String,
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  due_time: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    enum: ["completed", "pending"],
    default: "pending",
  },
});

const todo = mongoose.model("todos", todoSchema);

module.exports = { todo };
