const express = require("express");
const router = express.Router();
const {
  doSomeTest,
  getUserInfo,
  getUserDetails,
  updateUserInfo,
  updateUserPwd,
} = require("../controllers/myprofileController.js");

// GET - retrives the public data about the logged in user
router.get("/view", getUserInfo);

// GET - retrives all data about the logged in user for making changes
router.get("/settings", getUserDetails);

// PUT - saves changes made to the signed in users profile data
router.put("/settings/update/data", updateUserInfo);

// PUT - updates the signed in users password
router.put("/settings/update/pwd", updateUserPwd);

// POST - signing out the user
router.post("/signout", doSomeTest);

module.exports = router;
