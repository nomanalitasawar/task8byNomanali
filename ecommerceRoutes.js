const express = require('express');
const router = express.Router();


const products = [
  { id: 1, name: 'Product 1', price: 25 },
  { id: 2, name: 'Product 2', price: 30 },
  { id: 3, name: 'Product 3', price: 40 }
];


router.get('/products', (req, res) => {
  res.json(products);
});


router.post('/cart/add/:productId', authenticateUser, (req, res) => {
  const productId = parseInt(req.params.productId);
  const selectedProduct = products.find(product => product.id === productId);
  if (selectedProduct) {
 
    res.send(`Added ${selectedProduct.name} to the cart.`);
  } else {
    res.status(404).send('Product not found.');
  }
});


router.get('/products/:id', (req, res) => {
  const productId = req.params.id;
 
  const product = products.find((p) => p.id === parseInt(productId));
  if (!product) {
    res.status(404).send('Product not found');
    return;
  }
  res.json(product); 
});

module.exports = router;
