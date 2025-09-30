const express = require("express");
const router = express.Router();
const { getData } = require("../controllers/authController");

router.get("/", getData);

module.exports = router;
