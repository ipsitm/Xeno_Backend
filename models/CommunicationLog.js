const mongoose = require("mongoose");

const communicationLogSchema = new mongoose.Schema({
  audienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["SENT", "FAILED"], default: "SENT" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CommunicationLog", communicationLogSchema);
