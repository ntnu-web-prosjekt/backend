const express = require("express");
const router = express.Router();
const { getAllUsers, getSpecificUser, doSomeTest, getMatchingUsers, getReview, updateReview } = require("../controllers/finduserController.js");

// GET - Retrieves all users name, university, title, fulfilled requests and tags
router.get("/view", getAllUsers);

// GET - Retrieves all users matching the input name
router.get("/search/:firstname/:lastname", getMatchingUsers);

// GET - View the user profile of a specific user and retrieve the signed
//       in users requests which does not yet have a second examinator
router.get("/view/:id", getSpecificUser);

// POST - Send a request inquiry to the specific user
router.post("/inquiry");

// GET - Retrieve review of user
router.get("/review/:id", getReview);

// PUT - Update review of user
router.put("/review/update", updateReview)


module.exports = router;
