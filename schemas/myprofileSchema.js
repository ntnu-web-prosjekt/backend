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
});

const appliedSchema = new mongoose.Schema({
  appliedRequests: {
    requestID: { type: Number, required: true },
    status: { type: Boolean, default: true },
    default: {},
  },
});

const offersFromOthersSchema = new mongoose.Schema({
  offersFromOthers: {
    userID: { type: Number, required: true },
    requestID: { type: Number, required: true },
    default: {},
  },
});

const notesSchema = new mongoose.Schema({
  notes: {
    userID: { type: Number, required: true },
    noteText: { type: String, required: true },
    default: {},
  },
});

module.exports = [
  mongoose.model("users", myProfileSchema),
  mongoose.model("appliedRequests", appliedSchema),
  mongoose.model("offers", offersFromOthersSchema),
  mongoose.model("notes", notesSchema),
];
