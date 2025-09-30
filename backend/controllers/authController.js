const express = require("express");
const app = express();

const getData = app.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = {
  getData,
};
