const { products } = require('../data/products');
const { orders } = require('../data/orders');

const createOrder = (req, res) => {
  const { items, token } = req.body;
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized order attempt.' });
  }
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  // Validate stock
  for (let item of items) {
    const product = products.find(p => p.id === item.id);
    if (!product) {
      return res.status(404).json({ error: `Product not found: ${item.name}` });
    }
    if (product.stock < item.quantity) {
      return res.status(400).json({ error: `Stock insufficient for ${product.name}. Available: ${product.stock}` });
    }
    if (item.quantity < 1) {
      return res.status(400).json({ error: `Invalid quantity for ${product.name}` });
    }
  }

  // Create order
  const newOrder = {
    id: Date.now().toString(),
    token, // Ideally a user ID
    items: items.map(item => ({ ...item })),
    total: items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    date: new Date().toISOString()
  };

  // Reduce stock
  items.forEach(item => {
    const product = products.find(p => p.id === item.id);
    product.stock -= item.quantity;
  });

  orders.push(newOrder);
  res.status(201).json({ message: 'Order placed successfully', order: newOrder });
};

const getOrders = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userOrders = orders.filter(o => o.token === token);
  res.json(userOrders);
};

module.exports = {
  createOrder,
  getOrders
};
