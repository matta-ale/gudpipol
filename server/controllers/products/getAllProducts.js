const { getAllProductsHandler } = require('../../handlers');

const getAllProducts = async (req, res,next) => {
  try {
    const products = await getAllProductsHandler();
    res.status(200).json(products);
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

module.exports = getAllProducts;
