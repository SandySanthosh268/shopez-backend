import Order from '../models/Order.js';

export const dummyPayment = async (req, res) => {
  const { orderId, method } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentMethod = method;

  order.paymentResult = {
    status: 'SUCCESS',
    method,
    transactionId: `DUMMY_${Date.now()}`,
  };

  await order.save();

  res.json({
    message: `Payment successful via ${method}`,
    order,
  });
};
