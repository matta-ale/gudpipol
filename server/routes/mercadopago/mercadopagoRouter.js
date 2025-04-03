const { Router } = require('express');
const {
  createOrder,
  receiveWebhook,
  createPaymentUrl,
} = require('../../controllers');
const router = Router();

router.post('/createPaymentUrl', createPaymentUrl);

//router.post("/success", createOrder);
router.get('/success', (req, res) => {
  console.log('Puto el que lee');
  res.send('Success');
});
router.get('/failure', (req, res) => res.send('Failure'));
router.get('/pending', (req, res) => res.send('Pending'));
router.post('/webhook', receiveWebhook);

module.exports = router;
