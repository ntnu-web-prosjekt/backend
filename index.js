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
// app.use("/login", require("./routers/loginRouter.js"));
app.use("/register", require("./routers/registerRouter.js"));
app.use("/dashboard", require("./routers/dashboardRouter.js"));
app.use("/requests", require("./routers/requestsRouter.js"));
app.use("/catalogue", require("./routers/catalogueRouter.js"));
app.use("/finduser", require("./routers/finduserRouter.js")); // Finding users / viewing their profile
app.use("/myprofile", require("./routers/myprofileRouter.js")); // The logged in user profile

// Start Auth
async function verifyLogin(credentials) {
  var passwordHash = require("password-hash");
  if (credentials.username) var username = credentials.username;
  if (credentials.password) var password = credentials.password;
  var passwordFromDatabase;

  if (username !== null && password !== null)
    return User.findOne({ email: username }, "password").then((res) => {
      if (res) {
        passwordFromDatabase = res.password;
        return passwordHash.verify(password, passwordFromDatabase);
      } else return null;
    });
  else return null;
}

app.use("/login", async (req, res) => {
  console.log("Login attempt received with username: " + req.body.username);
  var passwordHash = require("password-hash");
  const status = await verifyLogin(req.body);
  if (status) {
    console.log("Login verified!");
    User.findOne({ email: req.body.username }).then((mongRes) => {
      var jsonData = mongRes;
      jsonData.token = "ThisIsOurToken";
      res.send(JSON.stringify(jsonData));
    });
  } else {
    console.log("Login failed.");
    res.send("Fail");
  }
});
// End Auth
