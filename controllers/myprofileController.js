const User = require("../schemas/myProfileSchema.js");

const getUserInfo = async (req, res) => {
  try {
    const userInfo = await User.findById(req.body.id).select(
      "name email phone degree university tags description"
    );

    if (!userInfo) {
      res.status(400);
      throw new Error("There exists no data yet!");
    } else {
      res.json(userInfo);
    }
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userInfo = await User.findById(req.body.id);

    if (!userInfo) {
      res.status(400);
      throw new Error("There exists no data yet!");
    } else {
      res.json(userInfo);
    }
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

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

module.exports = {
  doSomeTest,
  getUserInfo,
  getUserDetails,
};
