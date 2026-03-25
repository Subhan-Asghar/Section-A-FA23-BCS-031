const express = require("express");
const router = express.Router();

// Import Controller
const { getUserById, createUser } = require("../controllers/userController");

// Import Auth Middleware
const auth = require("../middleware/auth");


// 🔐 Apply auth ONLY to users routes
// 🧠 Middleware = Security guard checking token before entering users section
router.use(auth);


// GET /users/:id
router.get("/:id", getUserById);

// POST /users
router.post("/", createUser);

module.exports = router;