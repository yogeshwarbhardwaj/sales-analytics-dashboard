# Project Overview
Sales Analytics Dashboard is a  MERN application for analyzing and visualizing sales data.
Sales records are stored in MongoDB and processed using Node.js and Express.js REST APIs.
The React frontend displays KPIs such as Total Sales, Total Quantity, Total Orders, and Average Order Value.
Dynamic charts show sales trends, category-wise sales, and region-wise sales using API data.
The dashboard also supports filters for Date Range, Category, Region, and Product.

# Architecture
MongoDB
   ↓
Node.js + Express.js
   ↓
REST APIs
   ↓
React
   ↓
Recharts
   ↓
Interactive Dashboard

# Installation & Setup
# Backend Setup
cd backend
npm install
node server.js

# Frontend Setup
Open a new terminal:
cd frontend
npm install
npm run dev

# MongoDB Seed Instructions
cd backend
node seed/seed.js

# API Documentation
Sales APIs
GET
/api/sales
Get all sales records
GET
/api/sales/summary
Get sales summary and KPIs
GET
/api/sales/by-category
Get sales grouped by category
GET
/api/sales/by-region
Get sales grouped by region
GET
/api/sales/trend
Get sales trend by date
Sample Response
{
  "success": true,
  "data": {
    "totalSales": 3412500,
    "totalQuantity": 430,
    "totalOrders": 40,
    "averageOrderValue": 85312.5
  }
}

# Assumptions & Design Decisions

Sales data is stored in MongoDB and accessed through REST APIs.

MongoDB aggregation is used for summaries, trends, categories, and regions.

Charts use API data dynamically instead of hardcoded values.

Filters can be combined and update the dashboard dynamically.

Empty or invalid results are handled with appropriate messages.

React manages the dashboard state and API integration.