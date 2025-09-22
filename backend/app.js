/*const express = require("express");
const bodyParser = require("body-parser");

const { getStoredItems, storeItems } = require("./data/items");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});



app.get("/items", async (req, res) => {
  const storedItems = await getStoredItems();
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
  res.json({ items: storedItems });
});

app.get("/items/:id", async (req, res) => {
  const storedItems = await getStoredItems();
  const item = storedItems.find((item) => item.id === req.params.id);
  res.json({ item });
});

app.post("/items", async (req, res) => {
  const existingItems = await getStoredItems();
  const itemData = req.body;
  const newItem = {
    ...itemData,
    id: Math.random().toString(),
  };
  const updatedItems = [newItem, ...existingItems];
  await storeItems(updatedItems);
  res.status(201).json({ message: "Stored new item.", item: newItem });
});

app.listen(8080);*/
const express = require("express");
const bodyParser = require("body-parser");
const { getStoredItems, storeItems } = require("./data/items");

const app = express();
app.use(bodyParser.json());

// CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Get all items
app.get("/items", async (req, res) => {
  const items = await getStoredItems();
  await new Promise((resolve) => setTimeout(resolve, 2000)); // optional delay
  res.json({ items });
});

// Get single item by ID
app.get("/items/:id", async (req, res) => {
  const items = await getStoredItems();
  const item = items.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ item });
});

// Add a new item
app.post("/items", async (req, res) => {
  const items = await getStoredItems();
  const newItem = { ...req.body, id: Math.random().toString() };
  const updatedItems = [newItem, ...items];
  await storeItems(updatedItems);
  res.status(201).json({ message: "Stored new item.", item: newItem });
});

// Start server
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
