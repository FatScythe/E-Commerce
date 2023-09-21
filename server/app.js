require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// REMOVE LATER
app.use(cors());

// Middlewares
const errorMW = require("./middlewares/error-handler");
const notFoundMW = require("./middlewares/not-found");

// Routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const storeRouter = require("./routes/storeRoutes");
const orderRouter = require("./routes/orderRoutes");
const paymentRouter = require("./routes/paymentRoutes");

app.use(express.static(path.resolve(__dirname, "./public/build")));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan("tiny"));
app.use(express.static("./public"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/payment", paymentRouter);

app.get("*", async (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/build", "index.html"));
});

app.use(errorMW);
app.use(notFoundMW);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Server is listening on port: ${PORT}`);
});
