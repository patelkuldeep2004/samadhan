import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { getProductImage } from "../utils/getImage";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card h-100 border-0 shadow-sm">
      <img 
        src={getProductImage(product.title, product.img_link)} 
        alt={product.title}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-2">{product.title}</h5>
        
        {product.sellerName && (
          <p className="text-muted small mb-1">By: {product.sellerName}</p>
        )}

        <p className="text-muted small flex-grow-1 mb-2">
          {product.product_desc || product.description || "Fresh farm product"}
        </p>

        <div className="mb-3">
          <h6 className="text-success fw-bold mb-0">₹{product.price}/kg</h6>
          <small className="text-muted">Stock: {product.stock || 0} kg</small>
        </div>

        <div className="d-grid gap-2">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            View Details
          </button>
          <button
            className="btn btn-sm btn-success"
            onClick={() => {
              addToCart(product);
              alert("Added to cart!");
            }}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}
            disabled={product.stock === 0}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;