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
    name: {
      type: String,
      required: [true, "Please provide user name"],
    },
    product: {
      type: Types.ObjectId,
      ref: "Products",
      required: [true, "Please provide a product"],
    },
  },
  { timestamps: true }
);

reviewSchema.index({ user: 1, product: 1 }, { unique: true });

reviewSchema.statics.calculateRatings = async function (productId) {
  const result = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model("Products").findOneAndUpdate(
      { _id: productId },
      {
        numOfReviews: result[0]?.numOfReviews || 0,
        averageRating: Math.ceil(result[0]?.averageRating || 0),
      }
    );
  } catch (err) {
    console.error(err);
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.calculateRatings(this.product);
});

reviewSchema.post("deleteOne", async function () {
  await this.constructor.calculateRatings(this.product);
});

module.exports = model("Reviews", reviewSchema);
