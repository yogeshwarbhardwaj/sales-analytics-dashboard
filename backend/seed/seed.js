const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Sale = require("../models/Sale");

dotenv.config();

const salesData = [
  {
    date: new Date("2026-09-01"),
    product: "Laptop",
    category: "Electronics",
    region: "North",
    quantity: 5,
    revenue: 250000,
    cost: 200000,
  },
  {
    date: new Date("2026-09-03"),
    product: "Mobile Phone",
    category: "Electronics",
    region: "South",
    quantity: 10,
    revenue: 180000,
    cost: 140000,
  },
  {
    date: new Date("2026-09-05"),
    product: "Office Chair",
    category: "Furniture",
    region: "West",
    quantity: 8,
    revenue: 64000,
    cost: 48000,
  },
  {
    date: new Date("2026-09-07"),
    product: "Desk",
    category: "Furniture",
    region: "North",
    quantity: 6,
    revenue: 72000,
    cost: 54000,
  },
  {
    date: new Date("2026-09-10"),
    product: "Headphones",
    category: "Accessories",
    region: "East",
    quantity: 15,
    revenue: 45000,
    cost: 30000,
  },
  {
    date: new Date("2026-09-12"),
    product: "Keyboard",
    category: "Accessories",
    region: "South",
    quantity: 20,
    revenue: 30000,
    cost: 20000,
  },
  {
    date: new Date("2026-09-15"),
    product: "Monitor",
    category: "Electronics",
    region: "West",
    quantity: 7,
    revenue: 105000,
    cost: 77000,
  },
  {
    date: new Date("2026-09-18"),
    product: "Mouse",
    category: "Accessories",
    region: "North",
    quantity: 25,
    revenue: 25000,
    cost: 15000,
  },
  {
    date: new Date("2026-09-21"),
    product: "Tablet",
    category: "Electronics",
    region: "East",
    quantity: 9,
    revenue: 135000,
    cost: 99000,
  },
  {
    date: new Date("2026-09-24"),
    product: "Bookshelf",
    category: "Furniture",
    region: "South",
    quantity: 4,
    revenue: 36000,
    cost: 26000,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Sale.deleteMany();

    await Sale.insertMany(salesData);

    console.log("Sales data inserted successfully");

    await mongoose.connection.close();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();