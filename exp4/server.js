const express = require("express");

const app = express();
const PORT = 5000;

// Middleware (important)
app.use(express.json());

// Sample Data
const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    menu: [
      { id: 101, name: "Margherita Pizza", price: 10 },
      { id: 102, name: "Pepperoni Pizza", price: 12 }
    ]
  },
  {
    id: 2,
    name: "Burger Hub",
    menu: [
      { id: 201, name: "Cheese Burger", price: 8 },
      { id: 202, name: "Veg Burger", price: 7 }
    ]
  }
];

// Home
app.get("/", (req, res) => {
  res.send("Welcome to Food Delivery API");
});

// Get all restaurants
app.get("/restaurants", (req, res) => {
  res.json(restaurants);
});

// Get menu of restaurant
app.get("/restaurants/:id/menu", (req, res) => {
  const id = parseInt(req.params.id);

  const restaurant = restaurants.find(r => r.id === id);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  res.json(restaurant.menu);
});

// Place order
app.post("/order", (req, res) => {
  const { restaurantId, items } = req.body;

  const restaurant = restaurants.find(r => r.id === restaurantId);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  let total = 0;

  items.forEach(itemId => {
    const item = restaurant.menu.find(m => m.id === itemId);
    if (item) {
      total += item.price;
    }
  });

  res.json({
    message: "Order placed successfully",
    restaurant: restaurant.name,
    totalAmount: total
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});