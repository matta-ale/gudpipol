const { Collection } = require('../../models');

const deleteCollectionByIdHandler = async (id) => {

  const foundCollection = await Collection.findOne({
    where: { id },
  });
  if (!foundCollection) {
    const error = new Error(`Collection with id "${id}" not found in database`)
    error.statusCode = 400
    throw error;
  } else {
    await foundCollection.destroy();
    return
  }
};

module.exports = deleteCollectionByIdHandler;
