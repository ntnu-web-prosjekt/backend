const Request = require("../schemas/requestsSchema.js");
const User = require("../schemas/myProfileSchema.js");

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
* Adds a new request to the database.
*
* @param Object $req The request object
* @param Object $res The response object
*/
const createRequest = async (req, res) => {
  try {
    // Check if the user already created a request for this subject code
    const codeExists = await Request.findOne({ ownerId: req.body.ownerId, code: req.body.code });
    if (codeExists) {
      res.status(400).send("You have already published a request for this subject code.");
      return;
    }

    const request = new Request({
      ownerId: req.body.ownerId,
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
      location: req.body.location,
      tags: req.body.tags,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      url: req.body.url,
      level: req.body.level,
      examinatorLevel: req.body.examinatorLevel
    });
    
    // Adds the new request to the DB
    const savedRequest = await request.save();

    // Updates the users data in the DB with their new request
    const updateUsersRequests = await User.findByIdAndUpdate(req.body.ownerId, { $push: { ownedrequests: savedRequest._id + '' } });
    
    res.send("Request was successfully created!");

  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  doSomeTest, createRequest
};
