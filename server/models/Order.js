const { Schema, model } = require("mongoose");

const singleOrderItemSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
    },
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    apartment: {
      type: String,
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: Number },
    postal: { type: Number },
    note: { type: String },
    shippingFee: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: [singleOrderItemSchema],
    status: {
      type: String,
      enum: ["pending", "failed", "paid", "delivered", "canceled"],
      default: "pending",
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Provide a user"],
    },
    payWith: {
      type: String,
      required: true,
    },
    payAccessCode: {
      type: String,
    },
    clientSecret: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Orders", orderSchema);
