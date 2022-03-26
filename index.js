const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./connectDB");

// Initializing server
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Establising connection to MongoDB
connectDB();

// Serving routes
app.use("/test", require("./routers/testRouter.js"));
