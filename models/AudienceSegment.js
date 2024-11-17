// models/AudienceSegment.js
const mongoose = require("mongoose");

const audienceSegmentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the segment
  conditions: { type: Object, required: true }, // Conditions for filtering customers
  size: { type: Number, required: true }, // Number of customers in the segment
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AudienceSegment", audienceSegmentSchema);
