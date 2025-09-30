const mongoose = require("mongoose");

// User Addres Schema
const addressSchema = new mongoose.Schema({
  label: { type: String },
  recipient: { type: String }, // recipient name Recive
  street: { type: String },
  city: { type: String },
  postalCode: { type: String },
  country: { type: String },
  phone: { type: String },
});

// Main User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    addresses: [addressSchema], // an array address
  },
  { timestamps: true } // createdAt
);

module.exports = mongoose.model("User", userSchema);
