import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.role === "seller") {
      navigate("/seller-dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    setLoading(true);
    API.get("/product")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to load products. Please refresh the page.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) =>
          p.category?.id === parseInt(selectedCategory) ||
          p.categoryId === parseInt(selectedCategory)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.product_desc || p.description || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  const categories = [
    { id: "all", name: "All Products" },
    ...Array.from(
      new Map(
        products.map((p) => [
          p.category?.id || p.categoryId,
          {
            id: p.category?.id || p.categoryId,
            name: p.category?.name || `Category ${p.categoryId}`,
          },
        ])
      ).values()
    ),
  ];

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-success"></div>
        <p className="mt-3 text-muted">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">

      <div className="py-3" style={{ background: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
        <div className="container">
          <h1 className="text-success mb-2">Fresh Farm Products</h1>
          <p className="text-muted" style={{ marginBottom: 0 }}>
            Direct from farm to your table
          </p>
        </div>
      </div>

      <div className="container py-4">

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <select
              className="form-select form-select-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="alert alert-info text-center">
            No products found
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;