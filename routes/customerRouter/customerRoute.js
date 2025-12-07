const { customer } = require("../../models/customer");
const express = require("express");
const loginRouter = require("./loginRoute/loginRoute");

const router = express.Router();
router.use("/", loginRouter);

router.get("", async (req, res) => {
  const result = await customer.find();
  return res.json({
    result,
  });
});

router.get("/:id", async (req, res) => {
  const customer_id = req.params.id;
  const result = await customer.findOne({ _id: customer_id });

  return res.json({
    result,
  });
});

router.put("/update/:id", async (req, res) => {
  const customer_id = req.params.id;
  const { email, hasedPassword } = req.body;
  const result = await customer.updateOne(
    { _id: customer_id },
    {
      email: email,
      hasedPassword: hasedPassword,
    }
  );

  return res.json({
    result,
  });
});

router.delete("/delete/:id", async (req, res) => {
  const customer_id = req.params.id;
  const result = await customer.deleteOne({ _id: customer_id });

  return res.json({
    result,
  });
});

router.delete("/delete-all", async (req, res) => {
  const result = await customer.deleteMany();
});

router.post("/:id", async (req, res) => {
  return res.json({ mess: "working" });
});

module.exports = router;
