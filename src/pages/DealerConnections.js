"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "../styles/DealerConnections.css"
import { Store, User, MapPin, X } from "lucide-react"

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl

// Custom icons for dealer and shopkeepers
const dealerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const shopkeeperIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const DealerConnections = () => {
  const [dealerInfo, setDealerInfo] = useState(null)
  const [connectedShopkeepers, setConnectedShopkeepers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedShopkeeper, setSelectedShopkeeper] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    // In a real app, fetch dealer info and connected shopkeepers from API
    // For demo purposes, we'll use mock data
    const fetchDealerData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock dealer data
        const mockDealer = {
          dealer_id: 1,
          name: "John Doe",
          company_name: "Global Distribution Inc.",
          location_name: "123 Business Park, New York, NY",
          latitude: 40.7128,
          longitude: -74.006,
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
        }

        // Mock connected shopkeepers
        const mockShopkeepers = [
          {
            shopkeeper_id: 1,
            name: "Alice Smith",
            shop_name: "Tech Haven",
            location_name: "456 Main St, Brooklyn, NY",
            latitude: 40.6782,
            longitude: -73.9442,
            domain: "Electronics",
            email: "alice@techhaven.com",
            phone: "+1 (555) 987-6543",
          },
          {
            shopkeeper_id: 2,
            name: "Bob Johnson",
            shop_name: "Fashion Forward",
            location_name: "789 Fashion Ave, Manhattan, NY",
            latitude: 40.7831,
            longitude: -73.9712,
            domain: "Fashion",
            email: "bob@fashionforward.com",
            phone: "+1 (555) 456-7890",
          },
          {
            shopkeeper_id: 3,
            name: "Carol Williams",
            shop_name: "Grocery Plus",
            location_name: "321 Market St, Queens, NY",
            latitude: 40.7282,
            longitude: -73.7949,
            domain: "Grocery",
            email: "carol@groceryplus.com",
            phone: "+1 (555) 234-5678",
          },
        ]

        setDealerInfo(mockDealer)
        setConnectedShopkeepers(mockShopkeepers)
      } catch (err) {
        console.error("Error fetching dealer data:", err)
        setError("Failed to load dealer connections. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDealerData()
  }, [])

  const openShopkeeperProfile = (shopkeeper) => {
    setSelectedShopkeeper(shopkeeper)
  }

  const closeShopkeeperProfile = () => {
    setSelectedShopkeeper(null)
  }

  if (isLoading) {
    return (
      <div className="connections-loading">
        <div className="spinner"></div>
        <p>Loading connections...</p>
      </div>
    )
  }

  if (error) {
    return <div className="connections-error">{error}</div>
  }

  return (
    <div className="dealer-connections">
      <div className="connections-header">
        <h1>Your Connections</h1>
        <p>View and manage your connected shopkeepers</p>
      </div>

      <div className="connections-content">
        <div className="connections-map-container">
          {dealerInfo && (
            <MapContainer
              center={[dealerInfo.latitude, dealerInfo.longitude]}
              zoom={10}
              style={{ height: "500px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Dealer marker */}
              <Marker position={[dealerInfo.latitude, dealerInfo.longitude]} icon={dealerIcon}>
                <Popup>
                  <div className="map-popup">
                    <h3>{dealerInfo.company_name}</h3>
                    <p>
                      <strong>Owner:</strong> {dealerInfo.name}
                    </p>
                    <p>
                      <strong>Location:</strong> {dealerInfo.location_name}
                    </p>
                  </div>
                </Popup>
              </Marker>

              {/* Shopkeeper markers */}
              {connectedShopkeepers.map((shopkeeper) => (
                <Marker
                  key={shopkeeper.shopkeeper_id}
                  position={[shopkeeper.latitude, shopkeeper.longitude]}
                  icon={shopkeeperIcon}
                >
                  <Popup>
                    <div className="map-popup">
                      <h3>{shopkeeper.shop_name}</h3>
                      <p>
                        <strong>Owner:</strong> {shopkeeper.name}
                      </p>
                      <p>
                        <strong>Domain:</strong> {shopkeeper.domain}
                      </p>
                      <button className="view-profile-btn" onClick={() => openShopkeeperProfile(shopkeeper)}>
                        View Profile
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
          <div className="map-legend">
            <div className="legend-item">
              <div className="legend-marker dealer-marker"></div>
              <span>Your Location</span>
            </div>
            <div className="legend-item">
              <div className="legend-marker shopkeeper-marker"></div>
              <span>Connected Shopkeepers</span>
            </div>
          </div>
        </div>

        <div className="connected-shopkeepers">
          <h2>Connected Shopkeepers</h2>
          <div className="shopkeepers-grid">
            {connectedShopkeepers.map((shopkeeper) => (
              <div className="shopkeeper-card" key={shopkeeper.shopkeeper_id}>
                <div className="shopkeeper-card-header">
                  <div className="domain-icon">
                    <Store />
                  </div>
                  <h3>{shopkeeper.shop_name}</h3>
                </div>
                <div className="shopkeeper-card-content">
                  <p>
                    <User size={16} />
                    <span>{shopkeeper.name}</span>
                  </p>
                  <p>
                    <MapPin size={16} />
                    <span>{shopkeeper.location_name}</span>
                  </p>
                </div>
                <button className="view-profile-btn" onClick={() => openShopkeeperProfile(shopkeeper)}>
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shopkeeper Profile Modal */}
      {selectedShopkeeper && (
        <div className="shopkeeper-profile-modal">
          <div className="profile-content">
            <button className="close-profile" onClick={closeShopkeeperProfile}>
              <X size={24} />
            </button>

            <div className="profile-header">
              <div className="profile-icon">
                <Store size={32} />
              </div>
              <div>
                <h2>{selectedShopkeeper.shop_name}</h2>
                <p className="profile-domain">{selectedShopkeeper.domain}</p>
              </div>
            </div>

            <div className="profile-details">
              <div className="profile-section">
                <h3>Contact Information</h3>
                <p>
                  <strong>Owner:</strong> {selectedShopkeeper.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedShopkeeper.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedShopkeeper.phone}
                </p>
              </div>

              <div className="profile-section">
                <h3>Location</h3>
                <p>{selectedShopkeeper.location_name}</p>

                <div className="profile-map">
                  <MapContainer
                    center={[
                      (dealerInfo.latitude + selectedShopkeeper.latitude) / 2,
                      (dealerInfo.longitude + selectedShopkeeper.longitude) / 2,
                    ]}
                    zoom={10}
                    style={{ height: "300px", width: "100%" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Dealer marker */}
                    <Marker position={[dealerInfo.latitude, dealerInfo.longitude]} icon={dealerIcon}>
                      <Popup>
                        <div className="map-popup">
                          <h3>{dealerInfo.company_name}</h3>
                          <p>
                            <strong>Your Location</strong>
                          </p>
                        </div>
                      </Popup>
                    </Marker>

                    {/* Shopkeeper marker */}
                    <Marker
                      position={[selectedShopkeeper.latitude, selectedShopkeeper.longitude]}
                      icon={shopkeeperIcon}
                    >
                      <Popup>
                        <div className="map-popup">
                          <h3>{selectedShopkeeper.shop_name}</h3>
                          <p>
                            <strong>Shopkeeper Location</strong>
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="action-btn message-btn">Send Message</button>
              <button className="action-btn route-btn">Get Directions</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DealerConnections

