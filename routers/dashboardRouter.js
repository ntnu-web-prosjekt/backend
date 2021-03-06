const express = require("express");
const router = express.Router();
const { getDashboardData } = require("../controllers/dashboardController.js");

// GET - Retrieves the upcoming examinations, pending examinator requests
//       and total number of unanswered replies in the users inbox
router.get("/view/:user_id", getDashboardData);

module.exports = router;
