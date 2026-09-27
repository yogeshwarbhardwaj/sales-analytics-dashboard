# Sales Analytics Dashboard

A full-stack MERN application for analyzing sales data through an interactive dashboard.

The application stores sales records in MongoDB, provides REST APIs using Node.js and Express.js, and displays dynamic KPIs, charts, and filters using React and Recharts.

This project was built as a practical full-stack project to demonstrate REST APIs, MongoDB aggregation, React, dynamic data visualization, and API-based filtering.

## Features

- Total Sales
- Total Quantity
- Total Orders
- Average Order Value
- Sales by Category
- Sales by Region
- Sales Trend
- Category filter
- Region filter
- Product filter
- Date range filter
- Multiple filters together
- Reset Filters
- Dynamic API-based charts
- Loading state
- API error handling
- Invalid date range validation
- Empty result handling
- Responsive dashboard

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Recharts
- Fetch API
- Inline CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```text
sales-analytics-dashboard/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── seed/
│   ├── server.js
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   └── App.jsx
│   └── package.json
│
├── .gitignore
└── README.md