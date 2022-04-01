const express = require("express");
const router = express.Router();
const { doSomeTest } = require("../controllers/finduserController.js");

// GET - Retrieves all users name, university, title, fulfilled requests and tags
router.get("/view", doSomeTest);

// GET - View the user profile of a specific user and retrieve the signed
//       in users requests which does not yet have a second examinator
router.get("/view/:id", doSomeTest);

// POST - Send a request inquiry to the specific user
router.post("/inquiry");

module.exports = router;
