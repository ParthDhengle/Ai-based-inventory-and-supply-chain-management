import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import DealerLogin from "./pages/DealerLogin"
import DealerLanding from "./pages/DealerLanding"
import DealerConnections from "./pages/DealerConnections"
import Inventory from "./pages/Inventory"
import Landing from "./pages/Landing"
import DealerSignup from "./pages/DealerSignup"
import ShopkeeperLogin from "./pages/ShopkeeperLogin"
import ShopkeeperLanding from "./pages/ShopkeeperLanding"
import ShopkeeperSignup from "./pages/ShopkeeperSignup"
import ShopkeeperFindDealers from "./pages/ShopkeeperFindDealers"
import ShopkeeperProducts from "./pages/ShopkeeperProducts"
import ShopkeeperDashboard from "./pages/ShopkeeperDashboard"
import WorkflowPage from "./pages/WorkflowPage"
import "./App.css"
import ThemeProvider from "./components/ThemeProvider"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dealer_login" element={<DealerLogin />} />
            <Route path="/dealer_landing" element={<DealerLanding />} />
            <Route path="/dealer_signup" element={<DealerSignup />} />
            <Route path="/dealer_connections" element={<DealerConnections />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/shopkeeper_login" element={<ShopkeeperLogin />} />
            <Route path="/shopkeeper_landing" element={<ShopkeeperLanding />} />
            <Route path="/shopkeeper_signup" element={<ShopkeeperSignup />} />
            <Route path="/shopkeeper_find_dealers" element={<ShopkeeperFindDealers />} />
            <Route path="/shopkeeper_products" element={<ShopkeeperProducts />} />
            <Route path="/shopkeeper_dashboard" element={<ShopkeeperDashboard />} />
            <Route path="/workflow" element={<WorkflowPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

