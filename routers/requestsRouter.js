const express = require("express");
const router = express.Router();
const { doSomeTest } = require("../controllers/requestsController.js");

// GET - Retrieves the signed in users own requests and undertaken requests
router.get("/myrequests", doSomeTest);

// GET - Retrieves who is requesting the signed in users help and who is offering the signed in user help
router.get("/inbox", doSomeTest);

// POST - Creates a new request
router.post("/create", doSomeTest);

// PUT - Updates an existing request
router.put("/update/:id", doSomeTest);

// DELETE - Deletes an existing request
router.delete("/delete/:id", doSomeTest);

module.exports = router;
