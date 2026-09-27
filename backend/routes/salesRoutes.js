const express = require("express");

const {
  getSales,
  getSalesSummary,
  getSalesByCategory,
  getSalesByRegion,
  getSalesByDate,
} = require("../controllers/salesController");

const router = express.Router();

router.get("/", getSales);

router.get("/summary", getSalesSummary);

router.get("/by-category", getSalesByCategory);

router.get("/by-region", getSalesByRegion);

router.get("/trend", getSalesByDate);

module.exports = router;