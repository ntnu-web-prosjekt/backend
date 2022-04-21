const User = require("../schemas/myProfileSchema.js");
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
* Retrieves all users data to be shown on Find User page.
*
* @param Object $req The request object
* @param Object $res The response object
*/
const getAllUsers = async (req, res) => {
  try {
    // Retrieving user data
    const users = await User.find({}, "name university degree tags");

    if (!users) {
      res.status(400).send("No users yet.");
      return;
    } else {
      res.json(users);
    }
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
};

/**
* Retrieves data about a specific user.
*
* @param Object $req The request object
* @param Object $res The response object
*/
const getSpecificUser = async (req, res) => {
  try {
    // Retrieving users info
    const user = await User.findOne({ _id: req.params.id }, "name email phone university degree tags description");

    // Retrieving the users request which can still be applied
    const requests = await Request.find({ownerId: req.params.id, examinatorApproved: null}, "name code");

    if (!user) {
      res.status(400).send("No user with this ID.");
      return;
    } else {
      res.json({
        userInfo: user,
        usersRequests: requests
      });
    }
  } catch (error) {
    res.json({
      msg: error.message
    });
  }
};

module.exports = {
  doSomeTest, getAllUsers, getSpecificUser
};
