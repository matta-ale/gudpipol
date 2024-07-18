const { Collection } = require('../../models');

const getAllCollectionsHandler = async () => {
  const collections = await Collection.findAndCountAll({
  });
  if (collections.rows.length === 0) {
    const error = new Error('No collections in database');
    error.statusCode = 400;
    throw error;
  }


  return { data: collections.rows};
};

module.exports = getAllCollectionsHandler;
