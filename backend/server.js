const express = require("express");
const cors = require("cors");

const alertRoutes = require("./routes/alerts");
const logger = require("./middleware/logger");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use("/alerts", alertRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Flying Panda Visa Alerts API is running");
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Start server
// Start server (use environment PORT when provided by hosting)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
