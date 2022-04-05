const express = require("express");
const router = express.Router();
const { doSomeTest, viewRequest, applyRequest } = require("../controllers/catalogueController.js");

// GET - Retrieves all open requests
router.get("/view", doSomeTest);

// GET - Retrieves info about single request, checks if the signed in user have already applied for the request
router.get("/view/:id", viewRequest);

// PUT - Signed in user sends application for the request they are viewing
router.put("/apply/:id", applyRequest);

module.exports = router;
