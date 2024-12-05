const { Router } = require('express');
const { getAllCollections,createCollection,deleteCollectionById, updateCollectionById } = require('../../controllers');
const {createCollectionValidation, collectionByIdValidation} = require('../../middlewares')
const router = Router();


router.get('/collections', getAllCollections);
router.post('/collections', createCollectionValidation, createCollection);
router.put('/collections/:id', collectionByIdValidation, updateCollectionById);
router.delete('/collections/:id', collectionByIdValidation, deleteCollectionById);

module.exports = router;