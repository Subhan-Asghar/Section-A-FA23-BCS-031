// 🧠 Business Logic Layer

// GET /users/:id
const getUserById = (req, res) => {
  const userId = req.params.id;

  res.json({
    message: `User fetched successfully`,
    userId: userId
  });
};


// POST /users
const createUser = (req, res) => {
  const userData = req.body;

  res.status(201).json({
    message: "User created successfully",
    data: userData
  });
};

module.exports = { getUserById, createUser };