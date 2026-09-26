const salesService = require("../services/salesService");

const getSales = async (req, res, next) => {
  try {
    const sales = await salesService.getAllSales();

    res.status(200).json({
      success: true,
      count: sales.length,
      data: sales,
    });
  } catch (error) {
    next(error);
  }
};

const getSalesByCategory = async (req, res, next) => {
  try {
    const data = await salesService.getSalesByCategory();

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
    const data = await salesService.getSalesByRegion();

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
    const data = await salesService.getSalesByDate();

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
  getSalesByCategory,
  getSalesByRegion,
  getSalesByDate,
};

