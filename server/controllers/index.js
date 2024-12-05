const getAllProducts = require('./products/getAllProducts');
const getProductById = require('./products/getProductById');
const createProduct = require('./products/createProduct');
const deleteProductById = require('./products/deleteProductById');
const updateProductById = require('./products/updateProductById');
const getAllCollections = require('./collections/getAllCollections');
const createCollection = require('./collections/createCollection');
const deleteCollectionById = require('./collections/deleteCollectionById');
const updateCollectionById = require('./collections/updateCollectionById');
const {createPayment, createOrder} = require('./mercadopago/mercadopago');
const receiveWebhook = require('./mercadopago/receiveWebhook');

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
  getAllCollections,
  createCollection,
  deleteCollectionById,
  updateCollectionById,
  createPayment,
  createOrder,
  receiveWebhook
};
