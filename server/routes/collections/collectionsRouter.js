const { Router } = require('express');
const { getAllCollections,createCollection,deleteCollectionById, updateCollectionById } = require('../../controllers');
const {createCollectionValidation, collectionByIdValidation} = require('../../middlewares')
const uploadCollectionBulk = require('../../utils/uploadCollectionBulk')
const router = Router();
const multer = require('multer');


router.get('/collections', getAllCollections);
router.post('/collections', createCollectionValidation, createCollection);
router.put('/collections/:id', collectionByIdValidation, updateCollectionById);
router.delete('/collections/:id', collectionByIdValidation, deleteCollectionById);
//para carga masiva
const upload = multer({ dest: 'uploads/' }); // Temporary storage
router.post("/collections/bulk", upload.single('file'),uploadCollectionBulk);

module.exports = router;
