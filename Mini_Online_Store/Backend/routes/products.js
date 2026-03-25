const express = require("express");
const router = express.Router();

// Import Controller
const { getProducts } = require("../controllers/productController");


// 🧠 Router = Separate mini-app (clean architecture)
router.get("/", getProducts);

module.exports = router;