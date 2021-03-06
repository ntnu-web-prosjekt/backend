const express = require("express");
const router = express.Router();
const { getStats } = require("../controllers/statsController.js");

// GET - Retrieve open request and matched requests data (shown on the front page before logging in)
router.get("/view", getStats);

module.exports = router;
