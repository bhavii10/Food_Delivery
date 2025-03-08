const express = require("express");
const router = express.Router();

let foodItems = []; // ✅ Store food items in memory

// ✅ GET /api/foods → Fetch all food items
router.get("/", (req, res) => {
  res.json(foodItems);
});

// ✅ POST /api/foods → Add a new food item (Admin only)
router.post("/", (req, res) => {
  const newFood = {
    id: foodItems.length + 1, // Auto-increment ID
    name: req.body.name,
    price: req.body.price,
    category: req.body.category || "Uncategorized", // Default category
  };
  foodItems.push(newFood);
  res.status(201).json(newFood);
});

// ✅ PUT /api/foods/:id → Update food details (Admin only)
router.put("/:id", (req, res) => {
  const food = foodItems.find(f => f.id === parseInt(req.params.id));
  if (!food) return res.status(404).json({ message: "Food item not found" });

  food.name = req.body.name || food.name;
  food.price = req.body.price || food.price;
  food.category = req.body.category || food.category;

  res.json(food);
});

// ✅ DELETE /api/foods/:id → Remove a food item
router.delete("/:id", (req, res) => {
  const index = foodItems.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Food item not found" });

  foodItems.splice(index, 1);
  res.json({ message: "Food item deleted" });
});

module.exports = router;



// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const router = express.Router();

// // ✅ Path to the JSON file inside the backend folder
// const foodListPath = path.join(__dirname, "../food_list.json");

// // ✅ Function to Read Food List from JSON
// const getFoodList = () => {
//     try {
//         const data = fs.readFileSync(foodListPath, "utf8");
//         return JSON.parse(data);
//     } catch (err) {
//         console.error("❌ Error reading food_list.json:", err);
//         return [];
//     }
// };

// // ✅ Function to Write to JSON File
// const saveFoodList = (foodItems) => {
//     try {
//         fs.writeFileSync(foodListPath, JSON.stringify(foodItems, null, 2));
//     } catch (err) {
//         console.error("❌ Error writing to food_list.json:", err);
//     }
// };

// // ✅ GET /api/foods → Fetch all food items
// router.get("/", (req, res) => {
//     const foodItems = getFoodList();
//     res.json(foodItems);
// });

// // ✅ POST /api/foods → Add a new food item
// router.post("/", (req, res) => {
//     const foodItems = getFoodList();
//     const newFood = {
//         id: foodItems.length + 1, // Auto-increment ID
//         name: req.body.name,
//         price: req.body.price,
//         category: req.body.category || "Uncategorized",
//         image: req.body.image || "/public/default.jpg", // Default image
//     };

//     foodItems.push(newFood);
//     saveFoodList(foodItems);

//     res.status(201).json(newFood);
// });

// // ✅ PUT /api/foods/:id → Update food details
// router.put("/:id", (req, res) => {
//     let foodItems = getFoodList();
//     const foodIndex = foodItems.findIndex(f => f.id === parseInt(req.params.id));

//     if (foodIndex === -1) return res.status(404).json({ message: "Food item not found" });

//     // Update food item details
//     foodItems[foodIndex] = {
//         ...foodItems[foodIndex],
//         name: req.body.name || foodItems[foodIndex].name,
//         price: req.body.price || foodItems[foodIndex].price,
//         category: req.body.category || foodItems[foodIndex].category,
//         image: req.body.image || foodItems[foodIndex].image,
//     };

//     saveFoodList(foodItems);
//     res.json(foodItems[foodIndex]);
// });

// // ✅ DELETE /api/foods/:id → Remove a food item
// router.delete("/:id", (req, res) => {
//     let foodItems = getFoodList();
//     const updatedFoodItems = foodItems.filter(f => f.id !== parseInt(req.params.id));

//     if (foodItems.length === updatedFoodItems.length) {
//         return res.status(404).json({ message: "Food item not found" });
//     }

//     saveFoodList(updatedFoodItems);
//     res.json({ message: "Food item deleted" });
// });

// module.exports = router;

