const express = require("express");

const {
  getSales,
  getSalesByCategory,
  getSalesByRegion,
  getSalesByDate,
} = require("../controllers/salesController");

const router = express.Router();


router.get("/", getSales);


router.get("/category", getSalesByCategory);


router.get("/region", getSalesByRegion);


router.get("/date", getSalesByDate);

module.exports = router;