const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://mailmdsana_db_user:fYMRtm5mD1XGDNqa@cluster0.hvmy19b.mongodb.net/foodDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Food = mongoose.model("Food", {
  name: String,
  price: Number
});

const Order = mongoose.model("Order", {
  foodName: String,
  quantity: Number
});

app.get("/", (req, res) => {
  res.send("Food Delivery Server Running");
});

app.post("/add-food", async (req, res) => {
  const food = new Food(req.body);
  await food.save();
  res.send("Food Added");
});

app.get("/foods", async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

app.post("/order", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.send("Order Placed");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});