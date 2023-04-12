require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Middlewares
const errorMW = require("./middlewares/error-handler");
const notFoundMW = require("./middlewares/not-found");

// Routes
const authRouter = require("./routes/authRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ECOMMERCE APP");
});

app.use("/api/v1/auth", authRouter);

app.use(errorMW);
app.use(notFoundMW);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Server is listening on port: ${PORT}`);
});
