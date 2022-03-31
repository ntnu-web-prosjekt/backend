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
  tags: { type: Array, default: [] },
  description: { type: String, default: "" },
  role: { type: Number, default: 0 },
  ownedrequests: { type: Array, default: [] },
  appliedRequests: {
    requestID: { type: Number, required: false },
    status: { type: Boolean, default: false },
    default: {},
  },
  notes: {
    userID: { type: Number, required: false },
    noteText: { type: String, required: false },
    default: {},
  },
  offersFromOthers: {
    userID: { type: Number, required: false },
    requestID: { type: Number, required: false },
    default: {},
  },
});

module.exports = mongoose.model("users", myProfileSchema);
