import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = "http://localhost:5000/api/sales";

function App() {
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalQuantity: 0,
    totalOrders: 0,
    averageOrderValue: 0,
  });

  const [categoryData, setCategoryData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [dateData, setDateData] = useState([]);

  const [allSales, setAllSales] = useState([]);

  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All");
  const [product, setProduct] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch sales data");
        }

        const result = await response.json();

        setAllSales(
          Array.isArray(result.data) ? result.data : []
        );
      } catch (error) {
        console.error(error);
        setError("Unable to load sales data.");
      }
    };

    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (category !== "All") {
          params.append("category", category);
        }

        if (region !== "All") {
          params.append("region", region);
        }

        if (product !== "All") {
          params.append("product", product);
        }

        if (startDate) {
          params.append("startDate", startDate);
        }

        if (endDate) {
          params.append("endDate", endDate);
        }

        const query = params.toString();

        const summaryUrl = query
          ? `${API_URL}/summary?${query}`
          : `${API_URL}/summary`;

        const categoryUrl = query
          ? `${API_URL}/by-category?${query}`
          : `${API_URL}/by-category`;

        const regionUrl = query
          ? `${API_URL}/by-region?${query}`
          : `${API_URL}/by-region`;

        const trendUrl = query
          ? `${API_URL}/trend?${query}`
          : `${API_URL}/trend`;

        const [
          summaryResponse,
          categoryResponse,
          regionResponse,
          trendResponse,
        ] = await Promise.all([
          fetch(summaryUrl),
          fetch(categoryUrl),
          fetch(regionUrl),
          fetch(trendUrl),
        ]);

        if (
          !summaryResponse.ok ||
          !categoryResponse.ok ||
          !regionResponse.ok ||
          !trendResponse.ok
        ) {
          throw new Error("Failed to fetch dashboard data");
        }

        const summaryResult = await summaryResponse.json();
        const categoryResult = await categoryResponse.json();
        const regionResult = await regionResponse.json();
        const trendResult = await trendResponse.json();

        setSummary(
          summaryResult.success
            ? summaryResult.data
            : {
                totalSales: 0,
                totalQuantity: 0,
                totalOrders: 0,
                averageOrderValue: 0,
              }
        );

        setCategoryData(
          Array.isArray(categoryResult.data)
            ? categoryResult.data
            : []
        );

        setRegionData(
          Array.isArray(regionResult.data)
            ? regionResult.data
            : []
        );

        setDateData(
          Array.isArray(trendResult.data)
            ? trendResult.data
            : []
        );

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Unable to load dashboard data.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [category, region, product, startDate, endDate]);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        allSales
          .map((sale) => sale.category)
          .filter(Boolean)
      ),
    ];
  }, [allSales]);

  const regions = useMemo(() => {
    return [
      "All",
      ...new Set(
        allSales
          .map((sale) => sale.region)
          .filter(Boolean)
      ),
    ];
  }, [allSales]);

  const products = useMemo(() => {
    return [
      "All",
      ...new Set(
        allSales
          .map((sale) => sale.product)
          .filter(Boolean)
      ),
    ];
  }, [allSales]);

  const resetFilters = () => {
    setCategory("All");
    setRegion("All");
    setProduct("All");
    setStartDate("");
    setEndDate("");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  const formattedDateData = dateData.map((item) => ({
    ...item,
    date: formatDate(item.date),
  }));

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial",
        }}
      >
        <h2>Loading sales data...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#1f2937",
        }}
      >
        Sales Analytics Dashboard
      </h1>

      {error && (
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto 20px",
            background: "#fee2e2",
            color: "#991b1b",
            padding: "15px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 30px",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Filters</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
            alignItems: "end",
          }}
        >
          <div>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Product</label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              {products.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: "100%",
                padding: "9px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div>
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                width: "100%",
                padding: "9px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            onClick={resetFilters}
            style={{
              padding: "11px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              background: "#1f2937",
              color: "white",
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto 30px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Total Sales</h3>
          <h2>₹{summary.totalSales.toLocaleString()}</h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Total Quantity</h3>
          <h2>{summary.totalQuantity}</h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Total Orders</h3>
          <h2>{summary.totalOrders}</h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Average Order Value</h3>
          <h2>
            ₹{summary.averageOrderValue.toFixed(2)}
          </h2>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            Sales by Category
          </h2>

          {categoryData.length === 0 ? (
            <p style={{ textAlign: "center" }}>
              No category data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            Sales by Region
          </h2>

          {regionData.length === 0 ? (
            <p style={{ textAlign: "center" }}>
              No region data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            Sales Trend
          </h2>

          {formattedDateData.length === 0 ? (
            <p style={{ textAlign: "center" }}>
              No trend data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={formattedDateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;