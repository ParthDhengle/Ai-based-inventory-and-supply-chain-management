"use client"

import { useState, useEffect } from "react"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import "../styles/ShopkeeperDashboard.css"
import { TrendingUp, ShoppingBag, Users, DollarSign, Package, ArrowUp, ArrowDown, Calendar } from "lucide-react"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const ShopkeeperDashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [dashboardData, setDashboardData] = useState(null)
  const [timeRange, setTimeRange] = useState("week") // week, month, year

  useEffect(() => {
    // In a real app, fetch dashboard data from API
    // For demo purposes, we'll use mock data
    const fetchDashboardData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock dashboard data
        const mockData = {
          stats: {
            totalSales: 12580.75,
            salesGrowth: 12.5,
            totalOrders: 156,
            ordersGrowth: 8.2,
            totalCustomers: 89,
            customersGrowth: 15.3,
            averageOrderValue: 80.65,
            aovGrowth: 4.1,
          },
          salesData: {
            week: {
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              data: [1250, 1800, 1600, 2100, 1800, 2400, 1600],
            },
            month: {
              labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
              data: [6500, 7800, 8200, 9100],
            },
            year: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              data: [12500, 13800, 14600, 15100, 16800, 18400, 19600, 21000, 22500, 23800, 25600, 28000],
            },
          },
          top_products: [
            { name: "Smartphone X", sales: 42, percentage: 25 },
            { name: "Wireless Earbuds", sales: 38, percentage: 22 },
            { name: "Smart Watch", sales: 25, percentage: 15 },
            { name: "Laptop Pro", sales: 18, percentage: 11 },
            { name: "Bluetooth Speaker", sales: 15, percentage: 9 },
            { name: "Other Products", sales: 30, percentage: 18 },
          ],
          ordersByDay: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            data: [18, 25, 20, 30, 22, 28, 15],
          },
        }

        setDashboardData(mockData)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to load dashboard data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleTimeRangeChange = (range) => {
    setTimeRange(range)
  }

  // Chart options and data
  const salesChartData = {
    labels: dashboardData?.salesData[timeRange].labels || [],
    datasets: [
      {
        label: "Sales ($)",
        data: dashboardData?.salesData[timeRange].data || [],
        borderColor: "#6a11cb",
        backgroundColor: "rgba(106, 17, 203, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#6a11cb",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const salesChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `$${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
  }

  const topProductsChartData = {
    labels: dashboardData?.top_products.map((product) => product.name) || [],
    datasets: [
      {
        data: dashboardData?.top_products.map((product) => product.percentage) || [],
        backgroundColor: ["#6a11cb", "#2575fc", "#8e2de2", "#4a00e0", "#7433f5", "#5900ff"],
        borderWidth: 0,
      },
    ],
  }

  const topProductsChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (context) => `${context.raw}% of sales`,
        },
      },
    },
    cutout: "60%",
  }

  const ordersByDayChartData = {
    labels: dashboardData?.ordersByDay.labels || [],
    datasets: [
      {
        label: "Orders",
        data: dashboardData?.ordersByDay.data || [],
        backgroundColor: "rgba(37, 117, 252, 0.7)",
        borderRadius: 6,
      },
    ],
  }

  const ordersByDayChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
  }

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    )
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>
  }

  return (
    <div className="shopkeeper-dashboard">
      <div className="dashboard-header">
        <h1>Sales Dashboard</h1>
        <p>Track your shop's performance and sales analytics</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon sales-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Sales</h3>
            <div className="stat-value">${dashboardData.stats.totalSales.toLocaleString()}</div>
            <div className={`stat-growth ${dashboardData.stats.salesGrowth >= 0 ? "positive" : "negative"}`}>
              {dashboardData.stats.salesGrowth >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              {Math.abs(dashboardData.stats.salesGrowth)}% from last period
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders-icon">
            <ShoppingBag size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <div className="stat-value">{dashboardData.stats.totalOrders}</div>
            <div className={`stat-growth ${dashboardData.stats.ordersGrowth >= 0 ? "positive" : "negative"}`}>
              {dashboardData.stats.ordersGrowth >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              {Math.abs(dashboardData.stats.ordersGrowth)}% from last period
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon customers-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Customers</h3>
            <div className="stat-value">{dashboardData.stats.totalCustomers}</div>
            <div className={`stat-growth ${dashboardData.stats.customersGrowth >= 0 ? "positive" : "negative"}`}>
              {dashboardData.stats.customersGrowth >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              {Math.abs(dashboardData.stats.customersGrowth)}% from last period
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon aov-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>Average Order Value</h3>
            <div className="stat-value">${dashboardData.stats.averageOrderValue.toFixed(2)}</div>
            <div className={`stat-growth ${dashboardData.stats.aovGrowth >= 0 ? "positive" : "negative"}`}>
              {dashboardData.stats.aovGrowth >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              {Math.abs(dashboardData.stats.aovGrowth)}% from last period
            </div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card sales-chart">
          <div className="chart-header">
            <h3>Sales Trend</h3>
            <div className="time-range-selector">
              <button className={timeRange === "week" ? "active" : ""} onClick={() => handleTimeRangeChange("week")}>
                Week
              </button>
              <button className={timeRange === "month" ? "active" : ""} onClick={() => handleTimeRangeChange("month")}>
                Month
              </button>
              <button className={timeRange === "year" ? "active" : ""} onClick={() => handleTimeRangeChange("year")}>
                Year
              </button>
            </div>
          </div>
          <div className="chart-container">
            <Line data={salesChartData} options={salesChartOptions} />
          </div>
        </div>

        <div className="chart-card products-chart">
          <div className="chart-header">
            <h3>Top Products</h3>
            <div className="chart-icon">
              <Package size={20} />
            </div>
          </div>
          <div className="chart-container">
            <Doughnut data={topProductsChartData} options={topProductsChartOptions} />
          </div>
        </div>

        <div className="chart-card orders-chart">
          <div className="chart-header">
            <h3>Orders by Day</h3>
            <div className="chart-icon">
              <Calendar size={20} />
            </div>
          </div>
          <div className="chart-container">
            <Bar data={ordersByDayChartData} options={ordersByDayChartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopkeeperDashboard

