import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

function SellerDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    if (!user) return;

    if (user.role !== "seller") {
      navigate("/");
      return;
    }

    API.get("/product")
      .then((res) => {
        const sellerProducts = res.data.filter(
          (p) => String(p.sellerId) === String(user.id)
        );

        setProducts(sellerProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, [user, navigate]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageError = (productId, productTitle) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
    console.log(`Image failed to load for product: ${productTitle}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="bg-light min-vh-100 py-4">
      <div style={{ background: "linear-gradient(135deg, #28a745 0%, #1e7e34 100%)", color: "white", padding: "30px 0", marginBottom: "30px" }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold mb-1" style={{ fontSize: "32px" }}>SELLER DASHBOARD</h1>
              <p className="mb-0">Manage your farm products and inventory</p>
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
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-0">Seller Profile</h5>
                <p className="text-muted small">Name: <strong>{user.name}</strong></p>
                <p className="text-muted small mb-0">Email: <strong>{user.email}</strong></p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <p className="text-muted small mb-1">Total Products</p>
                <h3 className="text-success fw-bold mb-0">{products.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <p className="text-muted small mb-1">Total Stock</p>
                <h3 className="fw-bold mb-0">{products.reduce((sum, p) => sum + (p.stock || 0), 0)} kg</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <Link to="/add-product" className="btn btn-success btn-lg fw-bold">
            + Add New Product
          </Link>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search your products by name..."
            className="form-control form-control-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* PRODUCTS */}
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h5 className="card-title fw-bold mb-4">My Products</h5>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-success"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="alert alert-info text-center">
                No products added yet. <Link to="/add-product">Add your first product</Link>
              </div>
            ) : (
              <div className="row g-4">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div style={{ height: "200px", overflow: "hidden", background: "#e9ecef", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {!imageErrors[p.id] ? (
                          <img
                            src={p.img_link || `https://picsum.photos/seed/${encodeURIComponent(p.title)}/300/200.jpg`}
                            alt={p.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={() => handleImageError(p.id, p.title)}
                          />
                        ) : (
                          <div style={{ color: "#6c757d", fontSize: "14px", textAlign: "center", padding: "10px" }}>
                            {p.title}
                          </div>
                        )}
                      </div>
                      <div className="card-body">
                        <h6 className="card-title fw-bold mb-2">{p.title}</h6>
                        <p className="text-success fw-bold mb-1">₹{p.price}/kg</p>
                        <p className="text-muted small mb-3">Stock: <strong>{p.stock || 0} kg</strong></p>
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

export default SellerDashboard;