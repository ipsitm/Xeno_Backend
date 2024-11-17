// routes/messageRoutes.js
router.post("/send", async (req, res) => {
    const { audienceId, message } = req.body;
  
    try {
      const audience = await AudienceSegment.findById(audienceId);
      const customers = await Customer.find(audience.conditions);
  
      const logs = customers.map((customer) => ({
        customerId: customer._id,
        audienceId,
        message: `Hi ${customer.name}, ${message}`,
        status: Math.random() < 0.9 ? "SENT" : "FAILED", // 90% success rate
      }));
  
      await CommunicationLog.insertMany(logs);
      res.status(200).json({ message: "Messages sent successfully", logs });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  