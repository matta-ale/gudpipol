// routes/orderRoutes.js
const express = require('express');
const { createOrder, deleteOrderById, getAllOrders,getOrderById,updateEmailSent } = require('../../controllers/');

const router = express.Router();

router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id/email-sent', updateEmailSent);
router.post('/orders', createOrder);
router.delete('/orders/:id', deleteOrderById);

module.exports = router;
