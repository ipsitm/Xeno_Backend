const express = require("express");
const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const audienceSegmentRoutes = require("./routes/audienceSegmentRoutes");
const cors = require("cors");


const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use(cors());

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/audience-segments", audienceSegmentRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
