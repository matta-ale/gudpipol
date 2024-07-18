const createProductValidation = require('./products/createProductValidation')
const createCollectionValidation = require('./collections/createCollectionValidation')
const collectionByIdValidation = require('./collections/collectionByIdValidation')
const productByIdValidation = require('./products/productByIdValidation')

const errorHandler = require('./errorHandler')

module.exports = {
    createProductValidation,
    createCollectionValidation,
    collectionByIdValidation,
    productByIdValidation,
    errorHandler
}