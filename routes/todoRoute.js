const express = require("express");
const app = express();
const { todo } = require("../models/todo");

const router = express.Router();

router.get("/todos", async (req, res) => {
  const newTodo = new todo({
    title: "xyz",
    priority: "Medium",
  });
  const response1 = await newTodo.save();
  const response = await todo.find({});
  return res.json({ mess: "hi there", response });
});

router.get("/todo/:id", async (req, res) => {
  const todo_id = req.params.id;
  const result = await todo.findOne({ _id: todo_id });
  return res.json({ result });
});

module.exports = router;
