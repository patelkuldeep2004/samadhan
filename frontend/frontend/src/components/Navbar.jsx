import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  const homeLink = user?.role === "seller" ? "/seller-dashboard" : "/";

  return (
    <>
      {(!user || user.role === "buyer") && (
        <div style={{ backgroundColor: "#28a745", padding: "8px 0", textAlign: "center", fontSize: "12px", color: "white" }}>
          Delivery in 2-3 days
        </div>
      )}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top">
        <div className="container-fluid">
          <Link to={homeLink} className="navbar-brand fw-bold">
            SAMADHAN
            {user && user.role === "seller" && <span className="badge bg-warning text-dark ms-2">Seller</span>}
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto align-items-center gap-3">
              <li className="nav-item">
                <Link to={homeLink} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link" onClick={(e) => e.preventDefault()}>
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="#help" className="nav-link" onClick={(e) => e.preventDefault()}>
                  Help
                </a>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto align-items-center gap-2">

              {(!user || user.role === "buyer") && (
                <li className="nav-item">
                  <Link to="/cart" className="nav-link position-relative">
                    Cart
                    {cart && cart.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                </li>
              )}

              {!user && (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="btn btn-outline-light btn-sm">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="btn btn-light btn-sm text-success fw-bold">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}

              {user && user.role === "seller" && (
                <li className="nav-item">
                  <Link to="/add-product" className="btn btn-sm btn-warning fw-bold">
                    Add Product
                  </Link>
                </li>
              )}

              {user && user.role === "buyer" && (
                <li className="nav-item">
                  <button 
                    className="btn btn-sm btn-outline-light"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              )}

              {user && (
                <li className="nav-item dropdown">
                  <button 
                    className="dropdown-toggle" 
                    type="button" 
                    id="userDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    style={{ color: 'white', cursor: 'pointer', background: 'none', border: 'none', padding: '0.5rem 0' }}
                  >
                    {user.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <span className="dropdown-item-text small text-muted">
                        {user.role === "seller" ? "Seller Account" : "Buyer Account"}
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    {user.role === "seller" && (
                      <li><Link className="dropdown-item" to="/seller-dashboard">Dashboard</Link></li>
                    )}
                    {user.role === "seller" && (
                      <li>
                        <button 
                          className="dropdown-item" 
                          onClick={handleLogout}
                          style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                        >
                          Logout
                        </button>
                      </li>
                    )}
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