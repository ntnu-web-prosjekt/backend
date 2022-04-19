const express = require("express");
require("dotenv").config();
const connectDB = require("./connectDB");
var cors = require("cors");

// Initializing server
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const User = require("./schemas/myProfileSchema");

//Enable all cors requests
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Establising connection to MongoDB
connectDB();

// Serving routes
app.use("/stats", require("./routers/statsRouter.js"));
app.use("/login", require("./routers/loginRouter.js"));
app.use("/register", require("./routers/registerRouter.js"));
app.use("/dashboard", require("./routers/dashboardRouter.js"));
app.use("/requests", require("./routers/requestsRouter.js"));
app.use("/catalogue", require("./routers/catalogueRouter.js"));
app.use("/finduser", require("./routers/finduserRouter.js")); // Finding users / viewing their profile
app.use("/myprofile", require("./routers/myprofileRouter.js")); // The logged in user profile

// Start Auth
const cors = require("cors");
app.use(cors());

function verifyLogin(credentials) {
  var passwordHash = require("password-hash");
  var username = credentials.username;
  var password = credentials.password;
  var passwordFromDatabase;

  User.findOne({ email: username }, "password").then((res) => {
    passwordFromDatabase = res.password;
    console.log(username, password, passwordFromDatabase);
    return passwordHash.verify(password, passwordFromDatabase);
  });
}

app.use("/login", (req, res) => {
  if (verifyLogin(req.body)) res.send("Success");
  else res.send("Fail");
});
// End Auth
