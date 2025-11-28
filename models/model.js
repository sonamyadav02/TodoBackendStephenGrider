const mongoose = require("mongoose");

const schema = mongoose.Schema;

const todo = new schema({
  title: String,
  prority: {
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

export {todo};