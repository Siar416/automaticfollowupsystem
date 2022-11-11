const express = require("express");
const router = express.Router();
const axios = require("axios");

const BASE_URL = "https://www.autofs.com/sortapi.php";

router.get("/", async (req, res) => {
  const response = await axios.get(BASE_URL);

  const data = await response.data;

  res.send(data);
});

module.exports = router;
