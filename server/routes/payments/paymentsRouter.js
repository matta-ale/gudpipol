const express = require('express');
const { createPayment, getPaymentById } = require('../../controllers/');
const router = express.Router();

router.post('/payments', createPayment);
router.get('/payments/:idMP', getPaymentById);



module.exports = router;
