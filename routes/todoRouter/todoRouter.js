const express = require("express");
const app = express();
const { todo } = require("../../models/todo");
const { tokenAuthorizer } = require("../../middleware/tokenAuthorizer");

const router = express.Router();

router.use(tokenAuthorizer);

router.get("/todos", async (req, res) => {
  const response = await todo.find({});
  return res.json({ response });
});

router.get("/todo/:id", async (req, res) => {
  const todo_id = req.params.id;
  const result = await todo.findOne({ _id: todo_id });
  return res.json({ result });
});

router.post("/add-todo", async (req, res) => {
  const { title, priority, due, status } = req.body;

  const newTodo = new todo({
    title,
    priority,
    due,
    status,
  });
  const result = await newTodo.save();

  return res.json({
    result,
  });
});

router.put("/update/:id", async (req, res) => {
  const todo_id = req.params.id;
  const { title, priority, due, status } = req.body;
  const result = await todo.updateOne(
    { _id: todo_id },
    {
      title,
      priority,
      due,
      status,
    }
  );

  return res.json({
    result,
  });
});

router.delete("/delete/:id", async (req, res) => {
  const todo_id = req.params.id;
  const result = await todo.deleteOne({ _id: todo_id });

  return res.json({ result });
});

router.delete("/delete-all", async (req, res) => {
  const result = await todo.deleteMany();

  return res.json({ result });
});
module.exports = router;
