const { Schema, model, Types } = require("mongoose");

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [4, "Ejoor e o po to"],
      required: [true, "Please provide title"],
    },
    comment: {
      type: String,
      minlength: [10, "Please provide more information"],
      maxlength: [150, "Ejoor e ti poju"],
      required: [true, "Please provide comment"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },
    user: {
      type: Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a user"],
    },
    product: {
      type: Types.ObjectId,
      ref: "Products",
      required: [true, "Please provide a product"],
    },
  },
  { timestamps: true }
);

module.exports = model("Reviews", reviewSchema);
