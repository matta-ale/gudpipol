const {updateProductByIdHandler} = require('../../handlers')

const updateProductById = async (req, res, next) => {
  const data = req.body;
  try {
    const productId = await updateProductByIdHandler(data);
    res.status(200).send(`Colection with id "${productId}" succesfully updated`);
  }  catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

module.exports = updateProductById;