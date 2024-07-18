const { Router } = require('express');
const { getAllProducts,createProduct, deleteProductById, updateProductById, getProductById} = require('../../controllers');
const {createProductValidation,productByIdValidation} = require('../../middlewares')

const router = Router();

router.get('/products', getAllProducts);
router.post("/products", createProductValidation, createProduct);
router.get('/products/:id',getProductById);
router.put('/products/:id', productByIdValidation, updateProductById);
router.delete('/products/:id', productByIdValidation, deleteProductById);

module.exports = router;
