const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');

const { productsRouter,collectionsRouter,productImagesRouter, mercadopagoRouter,ordersRouter } = require('./routes');
const {errorHandler} = require('./middlewares');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', collectionsRouter);
app.use('/', productsRouter);
app.use('/', productImagesRouter);
app.use('/', mercadopagoRouter);
app.use('/', ordersRouter);

app.use('/',errorHandler);

require('dotenv').config();

sequelize.sync({ alter: true }).then(() => {
  console.log('Database syncronized!');
});


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
