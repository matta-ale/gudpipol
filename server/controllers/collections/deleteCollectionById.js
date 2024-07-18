const {deleteCollectionByIdHandler} = require('../../handlers')

const deleteCollectionById = async (req, res, next) => {
  const {id} = req.params
  try {
    await deleteCollectionByIdHandler(id);
    res.status(200).send(`Collection with id ${id} has been deleted`);
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

module.exports = deleteCollectionById;