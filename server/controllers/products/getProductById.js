const {getProductByIdHandler} = require('../../handlers')

const getProductById = async (req, res, next) => {
  const {id} = req.params
  try {
    const product = await getProductByIdHandler(id);
    res.status(200).json(product);
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

module.exports = getProductById;