const express = require("express");
const router = express.Router();
const { doSomeTest } = require("../controllers/catalogueController.js");

// GET - Retrieves all open requests
router.get("/view", doSomeTest);

// GET - Retrieves info about single request, checks if the signed in user have already applied for the request
router.get("/view/:id", doSomeTest);

// POST - Signed in user sends application for the request they are viewing
router.post("/apply/:id", doSomeTest);

module.exports = router;
