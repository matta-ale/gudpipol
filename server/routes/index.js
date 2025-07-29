const productsRouter = require('./products/productsRouter')
const ordersRouter = require('./orders/ordersRouter')
const collectionsRouter = require('./collections/collectionsRouter')
const productImagesRouter = require('./productImages/productImagesRouter')
const paymentsRouter = require('./payments/paymentsRouter')
const mercadopagoRouter = require('./mercadopago/mercadopagoRouter')
module.exports = {
    productsRouter,
    collectionsRouter,
    productImagesRouter,
    paymentsRouter,
    mercadopagoRouter,
    ordersRouter
}