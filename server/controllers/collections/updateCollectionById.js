const {updateCollectionByIdHandler} = require('../../handlers')

const updateCollectionById = async (req, res, next) => {
  const data = req.body;
  try {
    const collectionId = await updateCollectionByIdHandler(data);
    res.status(200).send(`Colection with id "${collectionId}" succesfully updated`);
  }  catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

module.exports = updateCollectionById;