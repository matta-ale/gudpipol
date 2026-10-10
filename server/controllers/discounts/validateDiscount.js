const { resolveDiscount } = require('../../utils/discounts');

const validateDiscount = (req, res) => {
  const { code } = req.body || {};
  const result = resolveDiscount(code);

  if (!result.valid) {
    return res.status(400).json({
      valid: false,
      message: 'Código de descuento inválido',
    });
  }

  return res.status(200).json({
    valid: true,
    code: result.code,
    percent: result.percent,
  });
};

module.exports = validateDiscount;
