const express = require("express");
const router = express.Router();
const { doSomeTest } = require("../controllers/loginController.js");

// POST - signing in the user
router.post("/", doSomeTest);

module.exports = router;
