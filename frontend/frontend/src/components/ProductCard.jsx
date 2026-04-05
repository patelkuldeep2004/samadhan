import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleImageError = (e) => {
    e.target.src = `https://picsum.photos/seed/${encodeURIComponent(product.title)}/300/200.jpg`;
  };

  const getImageUrl = (imgLink) => {
    if (!imgLink) {
      return `https://picsum.photos/seed/${encodeURIComponent(product.title)}/300/200.jpg`;
    }
    
    if (imgLink.startsWith('uploads/')) {
      return `http://localhost:3000/${imgLink}`;
    }
    
    if (imgLink.startsWith('http')) {
      const separator = imgLink.includes('?') ? '&' : '?';
      return `${imgLink}${separator}t=${Date.now()}`;
    }
    
    return imgLink;
  };

  return (
    <div className="card h-100 border-0 shadow-sm">
      <img
        src={getImageUrl(product.img_link)}
        alt={product.title}
        className="card-img-top"
        onError={handleImageError}
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