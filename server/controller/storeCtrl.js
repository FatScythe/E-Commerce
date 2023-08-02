const Store = require("../models/Store");
const User = require("../models/User");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const { checkPermissions } = require("../utils");

const createStore = async (req, res) => {
  req.body.owner = req.user.userId;

  if (req.user.role !== "admin") {
    await User.findOneAndUpdate({ _id: req.user.userId }, { role: "seller" });
  }

  const store = await Store.create(req.body);
  res.status(StatusCodes.CREATED).json({ store });
};

const getAllStores = async (req, res) => {
  const stores = await Store.find({});
  const count = await Store.countDocuments({});
  res.status(StatusCodes.OK).json({ count, stores });
};

const getStore = async (req, res) => {
  const { id: storeId } = req.params;
  const store = await Store.findOne({ _id: storeId }).populate({
    path: "owner",
    select: "name avatar email",
  });

  if (!store) throw new NotFoundError(`No store with id: ${storeId}`);
  const products = await Product.find({ seller: store.owner });
  res.status(StatusCodes.OK).json({
    store,
    storeProducts: {
      count: products.length !== [] ? products.length : 0,
      products: products || [],
    },
  });
};

const updateStore = async (req, res) => {
  const { id: storeId } = req.params;
  const { name, desc } = req.body;
  const store = await Store.findOne({ _id: storeId });
  if (!store) throw new NotFoundError(`No store with id: ${storeId}`);
  checkPermissions(req.user, store.owner);

  store.name = name;
  store.desc = desc;

  await store.save();
  res.status(StatusCodes.OK).json({ store });
};

const deleteStore = async (req, res) => {
  const { id: storeId } = req.params;
  const store = await Store.findOne({ _id: storeId });
  const user = await User.findOne({ _id: store.owner });
  if (!store) throw new NotFoundError(`No store with id: ${storeId}`);
  checkPermissions(req.user, store.owner);
  if (req.user.role !== "admin") {
    await User.findOneAndUpdate({ _id: store.owner }, { role: "user" });
  }

  await store.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Deleted sucessfully" });
};

module.exports = {
  createStore,
  getAllStores,
  getStore,
  updateStore,
  deleteStore,
};
