const {customer} = require("../../models/customer");
const express = require("express");
const route = express.Router();

route.post("/sign-up", async (req, res) => {
  const { email, hasedPassword } = req.body;

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
