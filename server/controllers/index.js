const getAllProducts = require('./products/getAllProducts');
const getProductById = require('./products/getProductById');
const createProduct = require('./products/createProduct');
const deleteProductById = require('./products/deleteProductById');
const updateProductById = require('./products/updateProductById');
const getAllOrders = require('./orders/getAllOrders');
const updateEmailSent = require('./orders/updateEmailSent');
const getOrderById = require('./orders/getOrderById');
const createOrder = require('./orders/createOrder');
const deleteOrderById = require('./orders/deleteOrderById');
const getAllCollections = require('./collections/getAllCollections');
const createCollection = require('./collections/createCollection');
const deleteCollectionById = require('./collections/deleteCollectionById');
const updateCollectionById = require('./collections/updateCollectionById');
const {createPaymentUrl, createMpOrder} = require('./mercadopago/mercadopago');
const receiveWebhook = require('./mercadopago/receiveWebhook');
const createPayment = require('./payments/createPayments');
const getPaymentById = require('./payments/getPaymentById');

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
  createPaymentUrl,
  createOrder,
  deleteOrderById,
  getAllOrders,
  updateEmailSent,
  getOrderById,
  createMpOrder,
  createPayment,
  receiveWebhook,
  getPaymentById
};
