const express = require("express");
const app = express();
const { todo } = require("../../models/todo");
const { tokenAuthorizer } = require("../../middleware/tokenAuthorizer");
const { customer } = require("../../models/customer");

const router = express.Router();

router.use(tokenAuthorizer);

router.get("/todos", async (req, res) => {
  const role = req.user.role;
  if (role === "admin") {
    try {
      const response = await todo.find({});
      const size = await todo.aggregate([
        {
          $group: {
            _id: null,
            combined_object_size: { $sum: { $bsonSize: "$$ROOT" } },
          },
        },
      ]);
      return res.json({ response, size });
    } catch (err) {
      return res.json({
        mess: "Error ocurred while fetching all the todos",
        desc: err,
      });
    }
  } else {
    return res.status(401).json({
      message: "✖✖ Unauthorized Access ✖✖",
    });
  }
});

router.get("/todo/:id", async (req, res) => {
  try {
    const todo_id = req.params.id;
    const user = req.user;
    const result = await todo.findOne({ _id: todo_id });
    const response = await customer.findOne({
      _id: user.user_id,
    });
    const requiredTodo = response.todos.find((todo) => todo._id == todo_id);
    return res.json({ result, requiredTodo });
  } catch (err) {
    return res.json({
      mess: "error fetching todo by id at '/todo/:id'",
      desc: err,
    });
  }
});

router.post("/add-todo", async (req, res) => {
  try {
    const { title, priority, due, status } = req.body;
    const { user_id, username, role } = req.user;

    const newTodo = new todo({
      title,
      priority,
      due,
      status,
    });
    const result = await newTodo.save();

    const updateUser = await customer.updateOne(
      { _id: user_id },
      {
        $push: {
          todos: {
            title,
            priority,
            due,
            status,
          },
        },
      }
    );

    const user = await customer.findOne({ _id: user_id });
    return res.json({
      result,
      updateUser,
      user,
    });
  } catch (err) {
    return res.json({ message: "Error adding todo at /add-todo", desc: err });
  }
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
  const role = req.user.role;
  if (role === "admin") {
    const result = await todo.deleteMany();

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "✖✖ Unauthorized Access ✖✖" });
  }
});
module.exports = router;
