const {deleteProductByIdHandler} = require('../../handlers')

const deleteProductById = async (req, res, next) => {
  const {id} = req.params
  try {
    await deleteProductByIdHandler(id);
    res.status(200).send(`Product with id ${id} has been deleted`);
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

module.exports = deleteProductById;