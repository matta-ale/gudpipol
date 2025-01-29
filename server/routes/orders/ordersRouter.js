// routes/orderRoutes.js
const express = require('express');
const { createOrder, deleteOrderById, getAllOrders } = require('../../controllers/');

const router = express.Router();

router.get('/orders', getAllOrders);
router.post('/orders', createOrder);
router.delete('/orders/:id', deleteOrderById);

module.exports = router;
