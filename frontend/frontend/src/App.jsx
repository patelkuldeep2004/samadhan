import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import SellerDashboard from "./pages/SellerDashboard";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const { user, isLoading } = useContext(AuthContext);

  console.log("🔄 App rendering. User:", user, "IsLoading:", isLoading);

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {user.role === "buyer" && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}

            {user.role === "seller" && (
              <>
                <Route path="/" element={<SellerDashboard />} />
                <Route path="/seller-dashboard" element={<SellerDashboard />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </>
        )}
      </Routes>

      {user && <Footer />}
    </BrowserRouter>
  );
}

export default App;