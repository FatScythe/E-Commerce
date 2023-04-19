const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: {
    type: String,
    minLength: [3, "Name cannot be less than 3 characters"],
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
    required: [true, "Please provide email"],
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dg0mkn4ld/image/upload/v1681395070/Ayeti-Adorn/users/avatar_ali4xr.png",
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [6, "Password cannot be less than 6 characters"],
  },
  role: {
    type: String,
    enum: ["user", "seller", "admin"],
    default: "user",
    required: [true, "Please Provide role"],
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(this.password, salt);
  this.password = password;
});

userSchema.methods.comparePassword = async function (candidatePwd) {
  const isMatch = await bcrypt.compare(candidatePwd, this.password);
  return isMatch;
};

module.exports = model("Users", userSchema);
