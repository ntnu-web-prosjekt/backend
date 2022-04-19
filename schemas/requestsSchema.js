const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  tags: { type: Array },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  url: { type: String, default: "https://www.ntnu.no/" },
  level: { type: String, required: true },
  examinatorLevel: { type: String, required: true },
  active: { type: Boolean, default: false },
  examiatorId: { type: Array },
  examinatorApproved: { type: Number, default: null },
});

module.exports = mongoose.model("requests", requestsSchema);
