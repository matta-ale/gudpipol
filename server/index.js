const express = require('express');
// const mysql = require('mysql2');
const sequelize = require('./config/database');
const { Product, Collection } = require('./models');


const { productsRouter,collectionsRouter } = require('./routes');
const {errorHandler} = require('./middlewares');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', collectionsRouter);
app.use('/', productsRouter);
app.use('/',errorHandler);

require('dotenv').config();

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});





// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
