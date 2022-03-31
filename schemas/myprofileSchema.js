const mongoose = require("mongoose");

const myProfileSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  approvedByAdmin: { type: Boolean, default: false },
  university: { type: String, required: true },
  degree: { type: String, required: true },
  tags: { type: Array },
  description: { type: String },
  role: { type: Number, default: 0 },
  ownedrequests: { type: Array },
  appliedRequests: {
    requestID: { type: Number, required: true },
    status: { type: Boolean, default: false },
  },
  notes: {
    userID: { type: Number, required: true },
    noteText: { type: String, required: true },
  },
  offersFromOthers: {
    userID: { type: Number, required: true },
    requestID: { type: Number, required: true },
  },
});

module.exports = mongoose.model("users", myProfileSchema);
