const User = require("../schemas/myprofileSchema");
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
 const getMatchingUsers = async (req, res) => {
  try {
    let users;

    if (req.params.firstname == "-" && req.params.lastname == "-") {
      // Retrieving all users data
      users = await User.find({}, "name university degree tags");
    }
    else if (req.params.lastname == "-") {
      // Retrieving user data based on firstnames only
      users = await User.find({ "name.firstName": { "$regex": req.params.firstname, "$options": "i" } }, "name university degree tags");
    }
    // Retrieving user data based on input firstname and lastname
    else {
      users = await User.find({ "name.firstName": { "$regex": req.params.firstname, "$options": "i" }, "name.lastName": { "$regex": req.params.lastname, "$options": "i" } }, "name university degree tags");
    }

    if (users.length === 0) {
      res.json({
        "msg": "No users found"
      })
    } else {
      res.json(users);
    }
  } catch (error) {
    res.json({
      msg: error.message,
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
    const user = await User.findOne(
      { _id: req.params.id },
      "name email phone university degree tags description"
    );

    // Retrieving the users request which can still be applied
    const requests = await Request.find(
      { ownerId: req.params.id, examinatorApproved: null },
      "name code"
    );

    if (!user) {
      res.status(400).send("No user with this ID.");
      return;
    } else {
      res.json({
        userInfo: user,
        usersRequests: requests,
      });
    }
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};


/**
 * Retrieves notes belonging to a specific user.
 *
 * @param Object $req The request object
 * @param Object $res The response object
 */
 const getReview = async (req, res) => {
  try {
    const review = await User.findOne({_id: req.params.id}, "notes");
    
    if (review.length === 0) {
      res.json({
        "msg": "Reviews could not be retrieved"
      });

    } else {
      res.json(review);
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
 * Example of body:
 * {
 *   "userId": "624581d44a155b889f2b20e4",
 *  "ownerId": "624581b44a155b889f2b20e1",
 *   "reviewText": "Very good and professional."
 * }
 *
 * @param Object $req The request object
 * @param Object $res The response object
 */
 const updateReview = async (req, res) => {
  try {
    // The ID of the user we are reviewing
    const userId = req.body.userId;

    // The review text of this user
    const reviewText = req.body.reviewText;

    const body = {};
    body[userId] = reviewText;

    // Finding the user who is writing the review text
    const updateUsersNotes = await User.findById(req.body.ownerId);

    // Preparing data to be updated in DB
    updateUsersNotes.set({
      notes: {
        ...updateUsersNotes.notes,
        ...body
      }
    })

    // Updating the note in the DB
    await updateUsersNotes.save();

    res.json({
      "msg": "Success"
    });

  } catch (error) {
    res.json({
      "msg": error.message
    }) 
  }
};

module.exports = {
  doSomeTest,
  getMatchingUsers,
  getAllUsers,
  getSpecificUser,
  getReview,
  updateReview
};
