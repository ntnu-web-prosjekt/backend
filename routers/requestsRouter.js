const express = require("express");
const router = express.Router();
const {
  createRequest,
  getAllRequests,
  getRequests,
  updateRequest,
  deleteRequest,
  getRequest,
  checkRequestApproved,
} = require("../controllers/requestsController.js");

// GET - Retrieve all requests
router.get("/", getAllRequests);

// GET - Retrieves the signed in users own requests and undertaken requests
router.get("/:_id", getRequests);

// GET - Retrieves who is requesting the signed in users help and who is offering the signed in user help
//router.get("/inbox", doSomeTest);

// GET - Get details/info of a request
router.get("/view/:_id", getRequest);

// POST - Creates a new request // HENRIK😎
router.post("/create", createRequest);

// PUT - Updates an existing request
router.put("/update/:_id", updateRequest);

// PUT - Accepts a request in the inbox
//router.put("/accept/request/:id", doSomeTest);

// PUT - Accepts a offer in the inbox
//router.put("/accept/offer/:id", doSomeTest);

// DELETE - Deletes an existing request
router.delete("/delete/:_id", deleteRequest);

router.get("/check/:_id", checkRequestApproved);

module.exports = router;
