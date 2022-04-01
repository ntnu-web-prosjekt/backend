const express = require("express");
const router = express.Router();
const { doSomeTest } = require("../controllers/myprofileController.js");

// GET - retrives the public data about the logged in user
router.get("/view", doSomeTest);

// GET - retrives all data about the logged in user for making changes
router.get("/settings", doSomeTest);

// PUT - saves changes made to the signed in users profile data
router.put("/settings/update/data", doSomeTest);

// PUT - updates the signed in users password
router.put("/settings/update/pwd", doSomeTest);

// POST - signing out the user
router.post("/signout", doSomeTest);

module.exports = router;
