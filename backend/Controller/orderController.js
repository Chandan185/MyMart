import Order from '../models/OrderModel.js';
import User from '../models/UserModel.js';
import asyncHandler from '../Middlewares/asyncHandler.js';

//@desc  Create new Order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    totalPrice,
    shippingPrice,
    taxPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(200);
    throw new Error('No order Items');
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      totalPrice,
      shippingPrice,
      taxPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc  get logged in user Order
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//@desc  get order by id
//@route GET /api/orders/:id
//@access Private
const getOrderByID = asyncHandler(async (req, res, next) => {
  let order;
  try {
    order = await Order.findById(req.params.id).populate('user', 'name email');
  } catch (err) {
    console.log(err);
  }
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
//@desc  update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrdertoPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.PaidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
//@desc  update order to deliver
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrdertoDeliver = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//@desc get all orders
//@route GET /api/orders
//@access Private
const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  getOrders,
  updateOrdertoPaid,
  updateOrdertoDeliver,
};
