const productsRouter = require('./products/productsRouter')
const ordersRouter = require('./Orders/ordersRouter')
const collectionsRouter = require('./collections/collectionsRouter')
const productImagesRouter = require('./productImages/productImagesRouter')
const mercadopagoRouter = require('./mercadopago/mercadopagoRouter')
module.exports = {
    productsRouter,
    collectionsRouter,
    productImagesRouter,
    mercadopagoRouter,
    ordersRouter
}