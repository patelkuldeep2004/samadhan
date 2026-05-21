import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import { getProductImage } from "../utils/getImage";

function UserDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Fetch all products and filter by user's ID (if user has created products)
    API.get("/product")
      .then((res) => {
        const userProducts = res.data.filter(
          (p) => String(p.sellerId) === String(user.id)
        );
        setProducts(userProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
        setLoading(false);
      });
  }, [user]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="bg-light min-vh-100 py-4">
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #28a745 0%, #1e7e34 100%)", color: "white", padding: "30px 0", marginBottom: "30px" }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold mb-1" style={{ fontSize: "32px" }}>📊 MY PRODUCTS</h1>
              <p className="mb-0">Edit your product photos and titles to reflect your content</p>
            </div>
            <button 
              onClick={handleLogout}
              className="btn btn-outline-light btn-lg fw-bold"
              style={{ borderColor: "white", color: "white" }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#28a745";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "white";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* PROFILE CARD */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-0">👤 Profile Information</h5>
                <p className="text-muted small">Name: <strong>{user.name}</strong></p>
                <p className="text-muted small">Email: <strong>{user.email}</strong></p>
                <p className="text-muted small mb-0">Role: <strong style={{ color: "#28a745" }}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <p className="text-muted small mb-1">📦 Total Products</p>
                <h3 className="text-success fw-bold mb-0">{products.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <p className="text-muted small mb-1">💰 Total Stock Value</p>
                <h3 className="fw-bold mb-0">₹{(products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0)).toFixed(2)}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* ADD PRODUCT BUTTON */}
        {user.role === "seller" && (
          <div className="mb-4">
            <Link to="/add-product" className="btn btn-success btn-lg fw-bold">
              ➕ Add New Product
            </Link>
          </div>
        )}

        {/* SEARCH */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search your products by name..."
            className="form-control form-control-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* PRODUCTS SECTION */}
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h5 className="card-title fw-bold mb-4">📸 My Products</h5>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-success"></div>
                <p className="text-muted mt-3">Loading your products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="alert alert-info text-center">
                <p className="mb-0">No products added yet.</p>
                {user.role === "seller" && (
                  <Link to="/add-product" className="btn btn-sm btn-success mt-3">
                    ➕ Add your first product
                  </Link>
                )}
              </div>
            ) : (
              <div className="row g-4">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm h-100">
                      <img 
                        src={getProductImage(p.title, p.img_link)} 
                        alt={p.title}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h6 className="card-title fw-bold mb-2">{p.title}</h6>
                        <p className="text-success fw-bold mb-1">₹{p.price}/kg</p>
                        <p className="text-muted small mb-2">Stock: <strong>{p.stock || 0} kg</strong></p>
                        <p className="text-muted small mb-0">{p.product_desc || "No description"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
