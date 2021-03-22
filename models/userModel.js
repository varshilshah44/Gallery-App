const db = require("../db/connection");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    mobile: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    confirmPassword: String,
    address: String,
    image: {
      type:String,
    },
    token: String,
    tokenExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { collation: "user" }
);

userSchema.index({ email: 1, token: 1 }, { background: true });

userSchema.pre("save", async function () {
  if (this.confirmPassword) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
  }
});

const user = db.model("user", userSchema);
module.exports = user;
