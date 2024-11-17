// routes/audienceSegmentRoutes.js
const express = require("express");
const AudienceSegment = require("../models/AudienceSegment");
const Customer = require("../models/Customer"); // Ensure you have a Customer model
const router = express.Router();

// POST: Create a new audience segment
router.post("/", async (req, res) => {
  const { name, conditions } = req.body;

  try {
    // Query the database to calculate the segment size based on conditions
    const query = {}; // Build MongoDB query from conditions
    if (conditions.spending) {
      query.totalSpending = { $gt: conditions.spending };
    }
    if (conditions.visits) {
      query.visits = { $lte: conditions.visits };
    }
    if (conditions.lastVisit) {
      query.lastVisit = { $lte: new Date(Date.now() - conditions.lastVisit * 30 * 24 * 60 * 60 * 1000) }; // Last X months
    }

    const customers = await Customer.find(query);
    const size = customers.length;

    // Save the segment
    const segment = new AudienceSegment({ name, conditions, size });
    await segment.save();

    res.status(201).json({ message: "Audience segment created", segment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Fetch all audience segments
router.get("/", async (req, res) => {
  try {
    const segments = await AudienceSegment.find().sort({ createdAt: -1 });
    res.status(200).json(segments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
