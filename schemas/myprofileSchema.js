const mongoose = require("mongoose");

const myprofileSchema = new mongoose.Schema(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    approvedByAdmin: { type: Boolean, default: false },
    university: { type: String, required: true },
    degree: { type: String, required: true },
    tags: { type: Array, default: [] },
    description: { type: String, default: "" },
    role: { type: Number, default: 0 },
    ownedrequests: { type: Array, default: [] },
    appliedRequests: { type: mongoose.Schema.Types.Mixed, default: {} },
    offersFromOthers: { type: mongoose.Schema.Types.Mixed, default: {} },
    requestingYourHelp: { type: mongoose.Schema.Types.Mixed, default: {} },
    notes: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { minimize: false }
);

module.exports =
  mongoose.models.users || mongoose.model("users", myprofileSchema);
