const { Product } = require('../../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

const createProductHandler = async (data) => {
  const { id, name} = data;

  const foundProduct = await Product.findOne({
    where: {
      [Op.or]: [{ id }, { name }],
    },
  });
  data = { ...data, isActive: true };
  if (foundProduct) {
    if (!foundProduct.isActive) {
      //si es inactivo en vez de crearlo lo voy a pasar a activo
      const updated = await Product.update(data, {
        where: { name },
        return: true,
        raw: true,
      });
      return `Product with id "${id}" or name "${name}" existed with isActive status as 'false'. The status was modified to 'true'`;
    } else {
      const error = new Error('Product already registered with that name or id');
      error.statusCode = 409;
      throw error
    }
  } else {
    const created = await Product.create(data);
    return created;
  }
};

module.exports = createProductHandler;
