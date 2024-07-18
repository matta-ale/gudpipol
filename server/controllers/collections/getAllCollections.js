const { getAllCollectionsHandler } = require('../../handlers');

const getAllCollections = async (req, res, next) => {
  try {
    const collections = await getAllCollectionsHandler();
    res.status(200).json(collections.data);
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

module.exports = getAllCollections;
