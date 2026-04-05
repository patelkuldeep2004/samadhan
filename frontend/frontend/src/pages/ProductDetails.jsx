import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    API.get(`/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    alert("Added to cart!");
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Product not found</h4>
          <p>The product you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const stockStatus =
    product.stock > 50
      ? { class: "text-success", text: "In Stock" }
      : product.stock > 0
      ? { class: "text-warning", text: "Low Stock" }
      : { class: "text-danger", text: "Out of Stock" };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <button className="btn btn-secondary btn-sm mb-3" onClick={() => navigate("/")}>
          Back to Products
        </button>

        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm">
              <img
                src={product.img_link}
                alt={product.title}
                className="card-img-top"
                onError={(e) => {
                  e.target.src = `https://picsum.photos/seed/${encodeURIComponent(product.title)}/400x300.jpg`;
                }}
                style={{ height: "350px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h1 className="card-title mb-3">{product.title}</h1>

                {product.sellerName && (
                  <p className="text-muted mb-2">Seller: <strong>{product.sellerName}</strong></p>
                )}

                <h3 className="text-success fw-bold mb-2">₹{product.price}/kg</h3>

                <p className="text-muted mb-3">
                  Stock: <strong>{product.stock || 0} kg</strong> available
                </p>

                <p className="text-muted mb-4">
                  {product.product_desc || product.description || "Fresh farm product"}
                </p>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success btn-lg"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;