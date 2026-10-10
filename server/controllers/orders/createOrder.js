// controllers/orderController.js
const { Order, OrderProduct } = require('../../models');
const { resolveDiscount } = require('../../utils/discounts');

const createOrder = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    idNumber,
    address,
    province,
    city,
    postalCode,
    paymentMethod,
    cart,
    discountCode: rawDiscountCode,
  } = req.body;

  try {
    let discountCode = null;
    let discountPercent = null;

    if (rawDiscountCode) {
      const resolved = resolveDiscount(rawDiscountCode);
      if (!resolved.valid) {
        return res.status(400).json({ message: 'Código de descuento inválido' });
      }
      discountCode = resolved.code;
      discountPercent = resolved.percent;
    }

    // Crear la orden principal
    const newOrder = await Order.create({
      fullName,
      email,
      phone,
      idNumber,
      address,
      province,
      city,
      postalCode,
      paymentMethod,
      discountCode,
      discountPercent,
    });

    // Asociar productos con la orden
    const orderProducts = cart.map((item) => ({
      orderId: newOrder.id,
      productId: item.id,
      quantity: item.quantity,
      color: item.color, // Nuevo campo color
    }));

    await OrderProduct.bulkCreate(orderProducts);

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

module.exports = createOrder;
