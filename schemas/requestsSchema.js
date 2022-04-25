const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  subjectName: { type: String, required: true },
  subjectCode: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  tags: { type: Array },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  subjectUrl: { type: String, default: "https://www.ntnu.no/" },
  subjectLevel: { type: String, required: true },
  examinatorLevel: { type: String, required: true },
  active: { type: Boolean, default: false },
  examinatorId: { type: Array },
  examinatorApproved: { type: mongoose.Schema.Types.ObjectId, default: null },
});

module.exports = mongoose.model("requests", requestsSchema);
