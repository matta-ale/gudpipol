const { Router } = require('express');
const { createPayment, createOrder, receiveWebhook } = require('../../controllers');
const router = Router();

router.post("/createPayment", createPayment);

//router.post("/success", createOrder);
router.get("/success", createOrder);
router.get("/failure", (req, res) => res.send("Failure"));
router.get("/pending", (req, res) => res.send("Pending"));
router.post("/webhook", receiveWebhook);

module.exports = router;
