const mongoose = require("mongoose");
const Product = require("./models/Product");
const jsonProducts = require("./utils/products.json");
require("dotenv").config();

const populate = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("sucessful!!!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

populate();
