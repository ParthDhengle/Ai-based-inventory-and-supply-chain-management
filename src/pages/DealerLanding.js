"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./DealerLanding.css"

function DealerLanding() {
  const [dealerInfo, setDealerInfo] = useState({
    name: "",
    company: "",
    shops: [],
    stats: {
      totalShops: 0,
      totalProducts: 0,
      avgAccuracy: 0,
      lastPrediction: "",
    },
  });

  useEffect(() => {
    const fetchDealerInfo = async () => {
      try {
        const dealerId = localStorage.getItem('dealerId');
        if (!dealerId) {
          console.error("No dealerId found in localStorage");
          return;
        }

        const dealerResponse = await fetch(`http://localhost:8000/dealer/${dealerId}`);
        if (!dealerResponse.ok) {
          throw new Error(`Failed to fetch dealer info: ${dealerResponse.statusText}`);
        }
        const dealerData = await dealerResponse.json();

        const shopsResponse = await fetch(`http://localhost:8000/dealer/${dealerId}/shops`);
        if (!shopsResponse.ok) {
          throw new Error(`Failed to fetch shops: ${shopsResponse.statusText}`);
        }
        const shopsData = await shopsResponse.json();

        setDealerInfo({
          name: dealerData.name,
          company: dealerData.company,
          shops: shopsData,
          stats: dealerData.stats || {
            totalShops: shopsData.length,
            totalProducts: shopsData.reduce((acc, shop) => acc + (shop.productCount || 0), 0),
            avgAccuracy: 92.5, // Adjust as needed
            lastPrediction: "2023-06-15", // Adjust as needed
          },
        });
      } catch (error) {
        console.error("Error fetching dealer info:", error);
      }
    };

    fetchDealerInfo();
  }, []);

  return (
    <div className="dealer-landing">
      <div className="dealer-header">
        <div className="dealer-welcome">
          <h1>Welcome, {dealerInfo.name}</h1>
          <p>{dealerInfo.company}</p>
        </div>
        <Link to="/inventory" className="btn btn-primary">
          <i className="fas fa-chart-line"></i> Predict Inventory
        </Link>
      </div>

      <div className="dashboard-grid">
        <div className="stats-card">
          <div className="stats-header">
            <h3>Dashboard Overview</h3>
            <div className="stats-icon">
              <i className="fas fa-chart-pie"></i>
            </div>
          </div>
          <div className="stats-body">
            <div className="stat-item">
              <div className="stat-value">{dealerInfo.stats.totalShops}</div>
              <div className="stat-label">Connected Shops</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{dealerInfo.stats.totalProducts}</div>
              <div className="stat-label">Total Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{dealerInfo.stats.avgAccuracy}%</div>
              <div className="stat-label">Prediction Accuracy</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{dealerInfo.stats.lastPrediction}</div>
              <div className="stat-label">Last Prediction</div>
            </div>
          </div>
        </div>

        <div className="shops-card">
          <div className="shops-header">
            <h3>Your Shops</h3>
            <button className="btn-icon">
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <div className="shops-list">
            {dealerInfo.shops.map((shop) => (
              <div className="shop-item" key={shop.id}>
                <div className="shop-info">
                  <div className="shop-domain-icon">
                    <i
                      className={`fas ${
                        shop.domain === "Electronics"
                          ? "fa-laptop"
                          : shop.domain === "Fashion"
                            ? "fa-tshirt"
                            : shop.domain === "Grocery"
                              ? "fa-shopping-basket"
                              : "fa-store"
                      }`}
                    ></i>
                  </div>
                  <div className="shop-details">
                    <h4>{shop.name}</h4>
                    <p>
                      {shop.location} • {shop.domain}
                    </p>
                  </div>
                </div>
                <Link to="/inventory" className="btn-outline-sm">
                  View Inventory
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions-card">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <Link to="/inventory" className="action-item">
              <div className="action-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <span>Predict Demand</span>
            </Link>
            <Link to="/workflow" className="action-item">
              <div className="action-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <span>View Workflow</span>
            </Link>
            <button className="action-item">
              <div className="action-icon">
                <i className="fas fa-file-csv"></i>
              </div>
              <span>Upload Data</span>
            </button>
            <button className="action-item">
              <div className="action-icon">
                <i className="fas fa-cog"></i>
              </div>
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealerLanding;