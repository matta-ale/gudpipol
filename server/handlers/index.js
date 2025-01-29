const getAllProductsHandler = require('./products/getAllProductsHandler')
const getAllOrdersHandler = require('./orders/getAllOrdersHandler')
const deleteOrderByIdHandler = require('./orders/deleteOrderByIdHandler')
const createProductHandler = require('./products/createProductHandler')
const deleteProductByIdHandler = require('./products/deleteProductByIdHandler')
const getProductByIdHandler = require('./products/getProductByIdHandler')
const updateProductByIdHandler = require('./products/updateProductByIdHandler')
const getAllCollectionsHandler = require('./collections/getAllCollectionsHandler')
const deleteCollectionByIdHandler = require('./collections/deleteCollectionByIdHandler')
const createCollectionHandler = require('./collections/createCollectionHandler')
const updateCollectionByIdHandler = require('./collections/updateCollectionByIdHandler')

module.exports = {
    getAllProductsHandler,
    getAllOrdersHandler,
    deleteOrderByIdHandler,
    createProductHandler,
    deleteProductByIdHandler,
    getProductByIdHandler,
    updateProductByIdHandler,
    getAllCollectionsHandler,
    createCollectionHandler,
    deleteCollectionByIdHandler,
    updateCollectionByIdHandler
}