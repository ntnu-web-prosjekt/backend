const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/registerController.js");

// POST - Creates new user account
router.post("/", registerUser);

module.exports = router;