const { getAllProductsHandler } = require('../../handlers');

const getAllProducts = async (req, res,next) => {
  try {
    const { page = 1, pageSize = 9 } = req.query;
    const products = await getAllProductsHandler(page, pageSize);
    res.status(200).json(products);
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

module.exports = getAllProducts;
