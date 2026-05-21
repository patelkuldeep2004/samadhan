import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { getProductImage } from "../utils/getImage";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useContext(CartContext);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-success position-fixed top-50 start-50 translate-middle";
    alertDiv.style.zIndex = "9999";
    alertDiv.style.minWidth = "400px";
    alertDiv.innerHTML = `
      <h4>✓ Order Placed Successfully!</h4>
      <p>Total: <strong>₹${total.toFixed(2)}</strong></p>
      <small>Thank you for your purchase!</small>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 4000);
    clearCart();
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="mb-5">
          <h1 className="fw-bold display-5 text-success">
            🛒 Your Shopping Cart
          </h1>
          <p className="text-muted">
            {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <h2 className="text-muted mb-3">🛍️</h2>
              <h4 className="text-muted mb-3">Your cart is empty</h4>
              <p className="text-muted mb-4">
                Add some fresh farm products to get started!
              </p>
              <Link to="/" className="btn btn-success btn-lg">
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="border-bottom pb-4 mb-4">
                      <div className="row align-items-center">
                        <div className="col-sm-2 mb-3 mb-sm-0">
                          <img
                            src={getProductImage(item.title, item.img_link)}
                            alt={item.title}
                            className="img-fluid rounded"
                            style={{
                              height: "80px",
                              objectFit: "cover",
                              width: "100%"
                            }}
                          />
                        </div>

                        <div className="col-sm-4 mb-3 mb-sm-0">
                          <h5 className="fw-bold mb-1">{item.title}</h5>
                          <p className="text-success fw-bold mb-0">
                            ₹{item.price}/kg
                          </p>
                          {item.sellerName && (
                            <small className="text-muted">By: {item.sellerName}</small>
                          )}
                        </div>

                        <div className="col-sm-3 mb-3 mb-sm-0">
                          <div className="input-group input-group-sm" style={{ maxWidth: "130px" }}>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => decreaseQty(item.id)}
                            >
                              −
                            </button>
                            <input
                              type="text"
                              className="form-control form-control-sm text-center"
                              value={item.quantity}
                              readOnly
                              style={{ maxWidth: "50px" }}
                            />
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => increaseQty(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="col-sm-3 text-end">
                          <p className="fw-bold mb-2">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm sticky-lg-top" style={{ top: "20px" }}>
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-4">Order Summary</h5>

                  <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                    <span>Subtotal ({cart.length} items):</span>
                    <span className="fw-bold">₹{total.toFixed(2)}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                    <span>Shipping:</span>
                    <span className="fw-bold text-success">Free Delivery</span>
                  </div>

                  <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold fs-5">Total:</span>
                    <span className="fw-bold text-success fs-5">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>

                  <button
                    className="btn btn-success btn-lg w-100 mb-2"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className="btn btn-outline-danger w-100 mb-3"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>

                  <Link to="/" className="btn btn-outline-secondary w-100 btn-sm">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default Cart;