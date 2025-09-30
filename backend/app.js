// external
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// internal
const { connectDb } = require("./server");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(morgan("dev")); // in dev mode

const PORT = process.env.PORT || 3000;

// Connection
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
