const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// In-memory storage
let alerts = [];

/*
 Alert Model:
 {
   id,
   country,
   city,
   visaType,
   status,
   createdAt
 }
*/

// GET /alerts (with filters)
router.get("/", (req, res) => {
  const { country, status } = req.query; // ✅ CORRECT

  let result = alerts;

  if (country) {
    result = result.filter(a => a.country === country);
  }

  if (status) {
    result = result.filter(a => a.status === status);
  }

  res.status(200).json(result);
});


// POST /alerts
router.post("/", (req, res) => {
  const { country, city, visaType } = req.body;

  if (!country || !city || !visaType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newAlert = {
    id: uuidv4(),
    country,
    city,
    visaType,
    status: "Active",
    createdAt: new Date().toISOString(),
  };

  alerts.push(newAlert);
  res.status(201).json(newAlert);
});

// PUT /alerts/:id (update status)
router.put("/:id", (req, res) => {
  const { status } = req.body;

  const alert = alerts.find(a => a.id === req.params.id);

  if (!alert) {
    return res.status(404).json({ message: "Alert not found" });
  }

  if (status) {
    alert.status = status;
  }

  res.status(200).json(alert);
});

// DELETE /alerts/:id
router.delete("/:id", (req, res) => {
  const index = alerts.findIndex(a => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Alert not found" });
  }

  alerts.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
