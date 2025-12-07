const { customer } = require("../../../models/customer");
const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

route.get("/sign-in", (req, res) => {});

module.exports = route;
