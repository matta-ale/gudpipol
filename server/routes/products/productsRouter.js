const { Router } = require('express');
const { getAllProducts,createProduct, deleteProductById, updateProductById, getProductById} = require('../../controllers');
const {createProductValidation,productByIdValidation} = require('../../middlewares')
const uploadProductBulk = require('../../utils/uploadProductBulk')

const router = Router();
const multer = require('multer');


router.get('/products', getAllProducts);
router.post('/products', createProductValidation, createProduct);
router.get('/products/:id',getProductById);
router.put('/products/:id', productByIdValidation, updateProductById);
router.delete('/products/:id', productByIdValidation, deleteProductById);
//para carga masiva
const upload = multer({ dest: 'uploads/' }); // Temporary storage
router.post('/products/bulk', upload.single('file'),uploadProductBulk);

module.exports = router;
