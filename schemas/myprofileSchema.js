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
    requestID: { type: Number, required: true },
    status: { type: Boolean, default: false },
    default: {},
  },
  notes: {
    userID: { type: Number, required: true },
    noteText: { type: String, required: true },
    default: {},
  },
  offersFromOthers: {
    userID: { type: Number, required: true },
    requestID: { type: Number, required: true },
    default: {},
  },
});

module.exports = mongoose.model("users", myProfileSchema);
