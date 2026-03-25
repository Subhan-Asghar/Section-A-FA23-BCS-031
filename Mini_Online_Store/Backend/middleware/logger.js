// 🧠 Logger = Waiter noting every order request

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to next middleware/route
};

module.exports = logger;