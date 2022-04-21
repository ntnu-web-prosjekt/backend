const User = require("../schemas/myprofileSchema.js");
const passwordHash = require("password-hash");

// const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  console.log("Started registration of user");
  // const salt = await bcrypt.genSalt(10);
  // const hashPwd = await bcrypt.hash(req.body.password, salt);
  const hashPwd = passwordHash.generate(req.body.password);

  //check if the user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    console.log("email already exists!", req.body.email);
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
    password: hashPwd, // hashed password
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
    if (savedUser) res.send("success");
    else res.send("Failed");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  registerUser,
};
