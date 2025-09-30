const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Address Schema
const addressSchema = new mongoose.Schema({
  label: { type: String },
  recipient: { type: String }, // recipient name
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
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    addresses: [addressSchema],
  },
  { timestamps: true }
);

// Pre-save: hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role }, // payload
    process.env.JWT_SECRET,
    { expiresIn: JWT_LIFETIME } // token expiration
  );
};

// Export User model
module.exports = mongoose.model("User", userSchema);
