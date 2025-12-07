const { customer } = require("../../../models/customer");
const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

route.post("/sign-up", async (req, res) => {
  const { email, password } = req.body;

  const hasedPassword = await bcrypt.hash(password, 10);

  const newCustomer = new customer({
    email,
    hasedPassword,
  });
  const result = await newCustomer.save();

  return res.json({
    result,
  });
});

route.get("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const hasedPassword = await bcrypt.hash(password, 10);

  const user = await customer.findOne({ email: email });

  if (user == null) return res.json({ mess: "Please enter valid credentials" });

  if (hasedPassword != user.hasedPassword)
    return res.json({ mess: "Please enter Valid credentials" });

  const payload = { username: user.email };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  return res.json({
    token: "dkfjdjf",
  });
});
module.exports = route;
