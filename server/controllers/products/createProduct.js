const {createProductHandler} = require('../../handlers/');

const createProduct = async (req, res, next) => {
  const data = req.body;
  try {
    const product = await createProductHandler(data);
    if (typeof product == 'string') {
      res.status(200).send(product);
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

module.exports = createProduct;
