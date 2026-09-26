const Sale = require("../models/Sale");

const getAllSales = async () => {
  return await Sale.find().sort({ date: 1 });
};

const getSalesByCategory = async () => {
  const result = await Sale.aggregate([
    {
      $group: {
        _id: "$category",
        revenue: {
          $sum: "$revenue",
        },
        quantity: {
          $sum: "$quantity",
        },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        revenue: 1,
        quantity: 1,
      },
    },
    {
      $sort: {
        revenue: -1,
      },
    },
  ]);

  return result;
};

const getSalesByRegion = async () => {
  const result = await Sale.aggregate([
    {
      $group: {
        _id: "$region",
        revenue: {
          $sum: "$revenue",
        },
        quantity: {
          $sum: "$quantity",
        },
      },
    },
    {
      $project: {
        _id: 0,
        region: "$_id",
        revenue: 1,
        quantity: 1,
      },
    },
    {
      $sort: {
        revenue: -1,
      },
    },
  ]);

  return result;
};

const getSalesByDate = async () => {
  const result = await Sale.aggregate([
    {
      $group: {
        _id: "$date",
        revenue: {
          $sum: "$revenue"
        },
        quantity: {
          $sum: "$quantity"
        }
      }
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        revenue: 1,
        quantity: 1
      }
    },
    {
      $sort: {
        date: 1
      }
    }
  ]);

  return result;
};

module.exports = {
  getAllSales,
  getSalesByCategory,
  getSalesByRegion,
  getSalesByDate,
};