import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  const homeLink = user?.role === "seller" ? "/seller-dashboard" : "/";
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {(!user || user.role === "buyer") && (
        <div className="samadhan-top-banner">
          <span>🚚 Free delivery on orders above ₹500</span>
          <span className="d-none d-md-inline"> • 🌿 100% Fresh from Farm • ⚡ Delivery in 2-3 days</span>
        </div>
      )}

      <nav className={`navbar navbar-expand-lg samadhan-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container-fluid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <Link to={homeLink} className="navbar-brand d-flex align-items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Samadhan" 
              style={{ width: '34px', height: '34px', borderRadius: '8px', objectFit: 'cover' }} 
            />
            <span className="samadhan-brand-text">SAMADHAN</span>
            {user && user.role === "seller" && (
              <span className="samadhan-seller-tag">Seller</span>
            )}
          </Link>

          <button 
            className="navbar-toggler border-0 shadow-none" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#samadhanNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="samadhanNav">
            <ul className="navbar-nav mx-auto align-items-center gap-1">
              <li className="nav-item">
                <Link 
                  to={homeLink} 
                  className={`nav-link samadhan-nav-link ${isActive(homeLink) || isActive("/") ? "active" : ""}`}
                >
                  🏠 Home
                </Link>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link samadhan-nav-link" onClick={(e) => e.preventDefault()}>
                  ℹ️ About
                </a>
              </li>
              <li className="nav-item">
                <a href="#help" className="nav-link samadhan-nav-link" onClick={(e) => e.preventDefault()}>
                  ❓ Help
                </a>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto align-items-center gap-2">
              {(!user || user.role === "buyer") && (
                <li className="nav-item">
                  <Link to="/cart" className={`nav-link samadhan-nav-link position-relative ${isActive("/cart") ? "active" : ""}`}>
                    🛒 Cart
                    {cart && cart.length > 0 && (
                      <span className="samadhan-cart-badge">{cart.length}</span>
                    )}
                  </Link>
                </li>
              )}

              {!user && (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="samadhan-btn-outline">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="samadhan-btn-filled">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}

              {user && user.role === "seller" && (
                <li className="nav-item">
                  <Link to="/add-product" className="samadhan-btn-add">
                    ➕ Add Product
                  </Link>
                </li>
              )}

              {user && (
                <li className="nav-item dropdown">
                  <button 
                    className="samadhan-user-btn dropdown-toggle" 
                    type="button"
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <span className="samadhan-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="samadhan-user-name d-none d-lg-inline">{user.name}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end samadhan-dropdown">
                    <li className="px-3 py-2">
                      <small className="text-muted fw-bold">
                        {user.role === "seller" ? "🏪 Seller Account" : "🛍️ Buyer Account"}
                      </small>
                      <br />
                      <small className="text-muted">{user.email}</small>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item samadhan-dropdown-item" to="/dashboard">📊 My Dashboard</Link></li>
                    {user.role === "seller" && (
                      <li><Link className="dropdown-item samadhan-dropdown-item" to="/seller-dashboard">🏪 Seller Dashboard</Link></li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item samadhan-dropdown-item samadhan-logout-item" onClick={handleLogout}>
                        🚪 Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;