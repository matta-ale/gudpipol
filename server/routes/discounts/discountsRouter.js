const { Router } = require('express');
const validateDiscount = require('../../controllers/discounts/validateDiscount');

const router = Router();

router.post('/discounts/validate', validateDiscount);

module.exports = router;
