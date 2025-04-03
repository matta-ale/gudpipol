const express = require('express');
const { createPayment } = require('../../controllers/');

const router = express.Router();

router.post('/payments', createPayment);

module.exports = router;
