const Request = require("../schemas/requestsSchema.js");

const doSomeTest = async (req, res) => {
  try {
    const testResult = await Test.find();

    if (testResult.length === 0) {
      res.status(400);
      throw new Error("There exists no data yet!");
    } else {
      res.json(testResult);
    }
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

/**
* Retrieves data for a specific request from the database as JSON.
*
* @param Object $req The request object
* @param Object $res The response object
*/
const viewRequest = async (req, res) => {
  try {
    // Retrieving request data
    const requestDetails = await Request.findOne({ _id: req.params.id });

    // Checking if the request exists
    if (!requestDetails) {
      res.status(400).json({ "msg": "This request ID does not exist." });
      return;
    }

    // Checks if the user already applied for this request
    if (requestDetails.examinatorId.includes(req.body.user_id)) {
      // Returns request details, plus indicator that already applied
      res.status(200).json({ requestDetails, alreadyApplied: true });
      return;

      // The user have not applied for this request yet, returns request details
    } else {
      res.status(200).json({ requestDetails });
      return;
    }
  } catch (error) {
    res.status(400).json({ "msg": error.message });
  }
};

/**
* Makes the logged in user apply for the request they viewing. Will be stored in the DB.
*
* @param Object $req The request object
* @param Object $res The response object
*/
const applyRequest = async (req, res) => {
  try {
  
  } catch (error) {
    res.status(400).json({ "msg": error.message });
  }
};

module.exports = {
  doSomeTest,viewRequest,applyRequest
};
