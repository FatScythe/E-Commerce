const { Schema, model, Types } = require("mongoose");

const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide store name"],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, "Please provide store description"],
    },
    insta: {
      type: String,
    },
    fb: {
      type: String,
    },
    tiktok: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide store owner"],
    },
  },
  { timestamps: true }
);

storeSchema.pre("deleteOne", { document: true }, async function (next) {
  await this.model("Products").deleteMany({ seller: this.owner });
});

module.exports = model("Stores", storeSchema);
