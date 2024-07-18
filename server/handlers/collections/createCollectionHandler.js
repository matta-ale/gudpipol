const { Collection } = require('../../models');

const createCollectionHandler = async (data) => {
  const { name } = data;

  const foundCollection = await Collection.findOne({
    where: { name },
  });
  if (foundCollection) {
    const error = new Error('Collection already registered with that name')
    error.statusCode = 409
    throw error;
  } else {
    const created = await Collection.create(data);
    return created;
  }
};

module.exports = createCollectionHandler;
