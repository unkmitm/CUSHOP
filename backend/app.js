// EXTERNAL MODULES

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config(); // Load environment variables from .env

// INTERNAL MODULES

const { connectDb } = require("./server"); // MongoDB connection
const authRoutes = require("./routes/authRouter"); // Auth routes

// EXPRESS APP INIT

const app = express();

// MIDDLEWARES

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // HTTP request logger in 'dev' format

// ROUTES

app.use("/api/auth", authRoutes); // Mount auth routes at /api/auth

// PORT

const PORT = process.env.PORT || 3000;

// DATABASE CONNECTION & SERVER START

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit process if DB connection fails
  });
