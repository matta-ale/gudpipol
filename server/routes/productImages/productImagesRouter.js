const { Router } = require('express');
const  uploadProductImagesBulk = require('../../utils/uploadProductImagesBulk')
const multer = require('multer');

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage
router.post("/productImages/bulk", upload.single('file'),uploadProductImagesBulk);


module.exports = router;
