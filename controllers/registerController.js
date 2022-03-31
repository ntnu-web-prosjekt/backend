const User = require("../schemas/myProfileSchema.js");

const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(req.body.password, salt);

  //check if the user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    res.status(400);
    throw new Error("Email already exists");
  }
  const user = new User({
    name: { firstName: req.body.firstName, lastName: req.body.lastName },
    email: req.body.email,
    phone: req.body.phone,
    password: hashPwd, // hashed password with bcryptjs
    degree: req.body.degree,
    university: req.body.university,
    tags: req.body.tags,
    description: req.body.description,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * Description of function...
 *
 */

module.exports = {
  registerUser,
};
