const express = require("express");
const router = express.Router();
const {doSomeTest} = require("../controllers/testController.js");

// GET
router.get("/view", doSomeTest);

module.exports = router;