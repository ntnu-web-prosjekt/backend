const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  tags: { type: Array },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  url: { type: String, default: "No URL provided..." },
  level: { type: String, required: true },
  examinatorLevel: { type: String, required: true },
  active: { type: Boolean, default: false },
  examinatorId: { type: Array },
  examinatorApproved: { type: Boolean, default: false },
});

module.exports = mongoose.model("requests", requestsSchema);
