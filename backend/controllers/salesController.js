const salesService = require("../services/salesService");

const getSales = async (req, res, next) => {
  try {
    const sales = await salesService.getAllSales(req.query);

    res.status(200).json({
      success: true,
      count: sales.length,
      data: sales,
    });
  } catch (error) {
    next(error);
  }
};

const getSalesSummary = async (req, res, next) => {
  try {
    const data = await salesService.getSalesSummary(req.query);

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getSalesByCategory = async (req, res, next) => {
  try {
    const data = await salesService.getSalesByCategory(req.query);

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getSalesByRegion = async (req, res, next) => {
  try {
    const data = await salesService.getSalesByRegion(req.query);

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getSalesByDate = async (req, res, next) => {
  try {
    const data = await salesService.getSalesByDate(req.query);

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSales,
  getSalesSummary,
  getSalesByCategory,
  getSalesByRegion,
  getSalesByDate,
};