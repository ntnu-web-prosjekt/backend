const User = require("../models/myProfileModel.js");

const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(req.body.password, salt);

  //check if the user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    res.status(400).send("Email already exists");
    return;
  }

  const user = new User({
    name: {
      firstName: req.body.name.firstName,
      lastName: req.body.name.lastName,
    },
    email: req.body.email,
    phone: req.body.phone,
    password: hashPwd, // hashed password with bcryptjs
    degree: req.body.degree,
    university: req.body.university,
    tags: req.body.tags,
    description: req.body.description,
    appliedRequests: {},
    offersFromOthers: {},
    notes: {},
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  registerUser,
};
