const {createCollectionHandler} = require('../../handlers/')

const createCollection = async (req, res, next) => {
  const data = req.body;
  try {
    const collection = await createCollectionHandler(data);
    res.status(200).json(collection);
  }  catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

module.exports = createCollection;