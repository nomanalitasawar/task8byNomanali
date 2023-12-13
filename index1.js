const express = require('express');
const app = express();
const ecommerceRoutes = require('./ecommerceRoutes');
const passwordStrengthRoutes = require('./passwordStrengthRoutes');

const PORT = 3000;


const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
  next();
};


const authenticateUser = (req, res, next) => {
 
  const isLoggedIn = true; 
  if (isLoggedIn) {
    next(); 
  } else {
    res.status(401).send('Unauthorized. Please log in.');
  }
};

app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);


app.use('/ECommerce', ecommerceRoutes);


app.use('/password', passwordStrengthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
