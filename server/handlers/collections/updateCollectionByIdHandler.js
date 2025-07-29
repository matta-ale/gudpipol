const { Collection } = require('../../models');

const updateCollectionByIdHandler = async (data) => {
  const { id } = data;
  const updated = await Collection.update(data, {
    where: { id: id },
    return: true,
    raw: true,
  });

  if (updated[0] === 0) {
    const error = new Error(`Can't update collection with id "${id}"`);
    error.statusCode = 400;
    throw error;
  } else {
    return id;
  }
};

module.exports = updateCollectionByIdHandler;
