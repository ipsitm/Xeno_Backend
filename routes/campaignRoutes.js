const express = require("express");
const router = express.Router();
const CommunicationLog = require("../models/CommunicationLog");

// GET: Fetch all campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await CommunicationLog.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Create a new campaign
router.post("/", async (req, res) => {
  try {
    const { audienceId, message } = req.body;
    const newCampaign = new CommunicationLog({ audienceId, message, status: "SENT" });
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// routes/campaignRoutes.js
router.get("/history", async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
