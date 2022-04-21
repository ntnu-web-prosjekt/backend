const User = require("../schemas/myProfileSchema.js");
const Request = require("../schemas/requestsSchema.js");

/**
* Retrieves user data to be shown on dashboard.
*
* @param Object $req The request object
* @param Object $res The response object
*/
const getDashboardData = async (req, res) => {
  try {
    // Checking if the user exists
    const user = await User.findById(req.body.user_id, "name requestingYourHelp offersFromOthers");

    // User does not exist
    if (user === null) {
      res.status(400).send("No user with this ID.");
      return;
    } 

    // User exists, lets retrieve rest of the data

    // Jobs that the user have already been approved for
    const activeJobs = await Request.find({examinatorApproved: req.body.user_id}, "name startDate");
        
    // Own jobs which have no approved examinator yet
    const ownJobs = await Request.find({ownerId: req.body.user_id, examinatorApproved: null}, "name startDate");

    res.json({
      userInfo: user, 
      activeJobs: activeJobs,
      ownJobs: ownJobs,
      waitingForReply: checkForWaitingReplies(user)
    });

  } catch (error) {
    res.json({
      "msg": error.message
    })
  }
};

/**
* Checks if the user have some offers or requests waiting for reply
*
* @param Object $userData The users data
* @return Boolean True or false based on if the users have waiting replies.
*/
const checkForWaitingReplies = (userData) => {
  if (Object.entries(userData.offersFromOthers).length === 0 && Object.entries(userData.requestingYourHelp).length === 0 ) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  getDashboardData
};
