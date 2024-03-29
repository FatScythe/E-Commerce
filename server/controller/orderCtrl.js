const Product = require("../models/Product");
const Order = require("../models/Order");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { checkPermisson } = require("../utils");

const createOrder = async (req, res) => {
  const {
    email,
    name,
    cartItems,
    subscribe,
    apartment,
    address,
    city,
    country,
    phone,
    postal,
    note,
    shippingFee,
    payWith,
  } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No cart item provided");
  }

  if (!address || !city || !country) {
    throw new BadRequestError("Provide address or city or country");
  }

  let orderItems = [];
  let subTotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.id });
    if (!dbProduct) {
      throw new NotFoundError(`No product with id: ${item.product}`);
    }
    const { id, name, price, image, seller } = dbProduct;
    const singleOrderItem = {
      name,
      amount: item.amount,
      price,
      image,
      color: item.color,
      size: item.size,
      product: id,
      seller,
    };

    orderItems = [...orderItems, singleOrderItem];
    subTotal += item.amount * price;
  }

  const total = shippingFee + subTotal;

  const order = await Order.create({
    name,
    email,
    subscribe,
    apartment,
    phone,
    postal,
    note,
    orderItems,
    total,
    subTotal,
    shippingFee,
    address,
    city,
    country,
    user: req.user.userId,
    payWith,
  });

  res.status(StatusCodes.OK).json({ msg: "Placed order", order });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ nbHits: orders.length, orders });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  checkPermisson(req.user, order._id);
  if (!order) {
    throw new NotFoundError(`No order with ID : ${orderId}`);
  }
  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders });
};

const getCurrentUserSales = async (req, res) => {
  const allOrders = await Order.find({}).lean().exec();
  let sales = [];

  const orders = allOrders.map((items) => {
    return {
      payWith: items.payWith,
      createdAt: items.createdAt,
      orderId: items._id,
      status: items.status,
      orderItems: items.orderItems,
    };
  });

  let allProducts = [];
  orders.map((order) => {
    const { orderItems, orderId, status, payWith, createdAt } = order;
    for (let i = 0; i < orderItems.length; i++) {
      const element = orderItems[i];
      allProducts.push({ ...element, orderId, status, payWith, createdAt });
    }
  });

  sales = allProducts.map((product) => {
    if (product?.seller.toString() == req.user.userId) {
      return product;
    }
  });

  sales = sales.filter((item) => item !== undefined);

  res.status(StatusCodes.OK).json({ count: sales.length, sales });
};

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { payStackAccessCode, flutterTrxId, stripeClientSecret } = req.body;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order with ID : ${orderId}`);
  }

  if (payStackAccessCode) {
    order.paystackAccessCode = payStackAccessCode;
  }
  if (flutterTrxId) {
    order.flutterTrxId = flutterTrxId;
  }
  if (stripeClientSecret) {
    order.stripeClientSecret = stripeClientSecret;
  }
  order.status = "paid";

  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  getCurrentUserSales,
  createOrder,
  updateOrder,
};
