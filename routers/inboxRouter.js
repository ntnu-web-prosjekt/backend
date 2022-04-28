const express = require("express");
const router = express.Router();
const { getInboxData, acceptRequest, acceptOffer, declineRequest, declineOffer } = require("../controllers/inboxController.js");

// GET - Retrieves the signed in users requests for help and offers for help
router.get("/view/:id", getInboxData);

// PUT - Accept to help someone with their request
router.put("/accept/request", acceptRequest);

// PUT - Accept that someone can help you with your own request
router.put("/accept/offer", acceptOffer);

// DELETE - Declines an examinators request for your help
router.delete("/decline/request/:id", declineRequest);

// DELETE - Declines an examinators who wants to help
router.delete("/decline/offer/:id", declineOffer);

module.exports = router;
