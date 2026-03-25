// 🧠 Controller = Kitchen preparing response

const getProducts = (req, res) => {
  const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 }
  ];

  res.json(products);
};

module.exports = { getProducts };