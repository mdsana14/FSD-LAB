const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  foodName: String,
  quantity: Number
});

module.exports = mongoose.model("Order", OrderSchema);