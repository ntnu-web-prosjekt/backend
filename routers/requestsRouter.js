const express = require("express");
const router = express.Router();
const { createRequest, getRequests, updateRequest, deleteRequest, getRequest } = require("../controllers/requestsController.js");

// GET - Retrieves the signed in users own requests and undertaken requests
router.get("/", getRequests);

// GET - Retrieves who is requesting the signed in users help and who is offering the signed in user help
//router.get("/inbox", doSomeTest);

// GET - Get details/info of a request
router.get("/:_id", getRequest);

// POST - Creates a new request // HENRIK😎
router.post("/create", createRequest);

// PUT - Updates an existing request
router.put("/update/_id", updateRequest);

// PUT - Accepts a request in the inbox
//router.put("/accept/request/:id", doSomeTest);

// PUT - Accepts a offer in the inbox
//router.put("/accept/offer/:id", doSomeTest);

// DELETE - Deletes an existing request
router.delete("/delete/:_id", deleteRequest);

module.exports = router;
