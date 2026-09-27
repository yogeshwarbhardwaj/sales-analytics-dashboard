const Sale = require("../models/Sale");

const buildFilter = ({ category, region, startDate, endDate }) => {
  const filter = {};

  if (category && category !== "All") {
    filter.category = category;
  }

  if (region && region !== "All") {
    filter.region = region;
  }

  if (startDate || endDate) {
    const conditions = [];

    if (startDate) {
      conditions.push({
        $gte: [
          {
            $convert: {
              input: "$date",
              to: "date",
              onError: null,
              onNull: null,
            },
          },
          new Date(`${startDate}T00:00:00.000Z`),
        ],
      });
    }

    if (endDate) {
      conditions.push({
        $lte: [
          {
            $convert: {
              input: "$date",
              to: "date",
              onError: null,
              onNull: null,
            },
          },
          new Date(`${endDate}T23:59:59.999Z`),
        ],
      });
    }

    filter.$expr = {
      $and: conditions,
    };
  }

  return filter;
};

const getAllSales = async (filters = {}) => {
  const filter = buildFilter(filters);

  if (filter.$expr) {
    return await Sale.aggregate([
      { $match: filter },
      { $sort: { date: 1 } },
    ]);
  }

  return await Sale.find(filter).sort({ date: 1 });
};

const getSalesSummary = async (filters = {}) => {
  const filter = buildFilter(filters);

  const result = await Sale.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$revenue",
        },
        totalQuantity: {
          $sum: "$quantity",
        },
        totalOrders: {
          $sum: 1,
        },
        averageOrderValue: {
          $avg: "$revenue",
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalSales: 1,
        totalQuantity: 1,
        totalOrders: 1,
        averageOrderValue: 1,
      },
    },
  ]);

  return result[0] || {
    totalSales: 0,
    totalQuantity: 0,
    totalOrders: 0,
    averageOrderValue: 0,
  };
};

const getSalesByCategory = async (filters = {}) => {
  const filter = buildFilter(filters);

  const result = await Sale.aggregate([
    {
      $match: filter,
    },
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

const getSalesByRegion = async (filters = {}) => {
  const filter = buildFilter(filters);

  const result = await Sale.aggregate([
    {
      $match: filter,
    },
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

const getSalesByDate = async (filters = {}) => {
  const filter = buildFilter(filters);

  const result = await Sale.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: "$date",
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
        date: "$_id",
        revenue: 1,
        quantity: 1,
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ]);

  return result;
};

module.exports = {
  getAllSales,
  getSalesSummary,
  getSalesByCategory,
  getSalesByRegion,
  getSalesByDate,
};