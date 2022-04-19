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
    const userInfo = await User.findById(req.body.id).select(
      "-__v -role -approvedByAdmin"
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

//needs cleanup, check logic
const updateUserPwd = async (req, res) => {
  const oldPassword = await User.findById(req.body.id).select("password");
  const hashedPassword = passwordHash.generate(oldPassword);

  if (req.body.password !== req.body.confirmPassword) {
    res
      .status(403)
      .send("Passwords do not match, please enter old password twice");
    return;
  }

  // const hashConfirmPwd = await hashedPassword.generate(
  //   req.body.confirmPassword
  // );
  const hashNewPwd = await hashedPassword.generate(req.body.newPassword);

  if (passwordHash.verify(req.body.confirmPassword, oldPassword)) {
    res.status(400).send("Passwords do not match");
    return;
  }
  try {
    const updateInfo = await User.updateOne(
      { _id: req.body.id },
      {
        $set: {
          password: hashNewPwd,
        },
      }
    );
    res.json(updateInfo);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// works, but sends back old data in Postman, use GetUserDetails to check for changes
const updateUserInfo = async (req, res) => {
  const updateQuery = {};

  if (!req.body.details) {
    res.status(400).send("No details to update");
    return;
  }

  if (req.body.details) {
    updateQuery.details = req.body.details;
  } else {
    res.status(403).send("Something went wrong, please try again later");
    return;
  }
  // change to then then then, await is to slow - lefty
  try {
    const updateInfo = await User.findByIdAndUpdate(req.body.id, {
      $set: updateQuery.details,
    });
    console.log(req.body.details);
    res.json(updateInfo);
    // res.redirect("/myprofile/settings");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// not started yet
const logoutUser = async (req, res) => {};

module.exports = {
  getUserInfo,
  getUserDetails,
  updateUserInfo,
  updateUserPwd,
  logoutUser,
};
