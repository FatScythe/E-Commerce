const { Schema, model, Types } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [4, "Minimum number of character is 4"],
      maxLength: [25, "Maximum number of character is 25"],
      required: [true, "Please provide product name"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      default: 0,
    },
    image: {
      type: String,
      default: "./img.png",
      required: [true, "Please provide product image"],
    },
    desc: {
      type: String,
      minLength: [10, "Minimum number of character is 10"],
      required: [true, "Please provide product description"],
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: {
        values: ["men", "women", "unisex"],
        message: "{VALUE} is not supported",
      },
    },
    likedBy: {
      type: [String],
      default: [],
    },
    store: {
      type: String,
      default: "Ayeti-Adorn",
      required: [true, "Please provide a store"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    color: {
      type: [String],
      default: ["#000"],
    },
    inventory: {
      type: Number,
      default: 0,
    },
    freeShipping: { type: Boolean, default: false },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    seller: {
      type: Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a seller"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.virtual("reviews", {
  ref: "Reviews",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

productSchema.pre("deleteOne", { document: true }, async function (next) {
  await this.model("Reviews").deleteMany({ product: this._id });
});
module.exports = model("Products", productSchema);
