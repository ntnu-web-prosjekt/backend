const express = require("express");
const router = express.Router();
const { verifyLogin } = require("../controllers/loginController.js");

// POST - signing in the user
router.post("/", verifyLogin);

module.exports = router;
