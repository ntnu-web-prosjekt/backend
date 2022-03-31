const express = require("express");
const router = express.Router();
const { doSomeTest } = require("../controllers/requestsController.js");

// GET - Retrieves the signed in users own requests and undertaken requests
router.get("/myrequests", doSomeTest);

// GET - Retrieves who is requesting the signed in users help and who is offering the signed in user help
router.get("/inbox", doSomeTest);

// GET - Get details/info of a request
router.get("/details/:id", doSomeTest);

// POST - Creates a new request // HENRIK😎
router.post("/create", doSomeTest);

// PUT - Updates an existing request
router.put("/update/:id", doSomeTest);

// PUT - Accepts a request in the inbox
router.put("/accept/request/:id", doSomeTest);

// PUT - Accepts a offer in the inbox
router.put("/accept/offer/:id", doSomeTest);

// DELETE - Deletes an existing request
router.delete("/delete/:id", doSomeTest);

module.exports = router;
