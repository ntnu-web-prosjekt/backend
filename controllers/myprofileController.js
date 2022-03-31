const User = require("../schemas/myProfileSchema.js");

const bcrypt = require("bcryptjs");

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

const updateUserPwd = async (req, res) => {
  const oldPassword = await User.findById(req.body.id).select("password");
  const salt = await bcrypt.genSalt(10);

  if (req.body.password !== req.body.confirmPassword) {
    res
      .status(403)
      .send("Passwords do not match, please enter old password twice");
    return;
  }

  const confirmPassword = await bcrypt.hash(req.body.password, salt);
  const newPassword = await bcrypt.hash(req.body.newPassword, salt);

  if (oldPassword !== confirmPassword) {
    res.status(400).send("Passwords do not match");
    return;
  }
  try {
    const updateInfo = await User.updateOne(
      { _id: req.body.id },
      {
        $set: {
          password: newPassword,
        },
      }
    );
    res.json(updateInfo);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// not finished yet, need to set update values
const updateUserInfo = async (req, res) => {
  try {
    const updateInfo = await User.updateOne({ _id: req.body.id }, { $set: {} });
    res.json(updateInfo);
  } catch (error) {
    res.status(400).send(error.message);
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
  updateUserInfo,
  updateUserPwd,
};
