const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: {
    type: String,
  },
  hasedPassword: {
    type: String,
  },
});

const customer = mongoose.model("customer", customerSchema);

module.exports = { customer };
