import { useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    categoryId: "1",
    product_desc: "",
    stock: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const categories = [
    { id: "1", name: "Grains & Staples" },
    { id: "2", name: "Vegetables" },
    { id: "3", name: "Fruits" },
    { id: "4", name: "Dairy Products" },
    { id: "5", name: "Other" },
    { id: "6", name: "Beverages" },
    { id: "7", name: "Snacks" },
    { id: "8", name: "Meat" },
    { id: "9", name: "Poultry" },
    { id: "10", name: "Seafood" }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('title', form.title);
      formData.append('price', parseFloat(form.price));
      formData.append('categoryId', parseInt(form.categoryId));
      formData.append('product_desc', form.product_desc);
      formData.append('stock', parseInt(form.stock) || 0);

      console.log("Sending product data with image:");
      console.log("Token present:", !!localStorage.getItem("token"));
      console.log("User data:", user);

      const response = await API.post("/product", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Product added successfully:", response.data);
      
      setSuccess(true);
      setForm({ title: "", price: "", categoryId: "1", product_desc: "", stock: "" });
      setImageFile(null);
      setImagePreview(null);
      setTimeout(() => {
        navigate("/seller-dashboard");
      }, 1500);
    } catch (err) {
      console.error("Error adding product:", err);
      console.error("Error response:", err.response?.data);
      setError(err.response?.data?.message || err.response?.data?.error || "Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "seller") {
    return (
      <div className="bg-light min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="alert alert-warning text-center">
            Only sellers can add products!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <h2 className="card-title text-center mb-4 fw-bold text-success">Add New Product</h2>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                  </div>
                )}

                {success && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    Product added successfully! Redirecting...
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Product Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Fresh Tomatoes"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Price per kg (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g., 50"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Category</label>
                    <select
                      className="form-control"
                      value={form.categoryId}
                      onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Stock Available (kg)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g., 100"
                      value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                      className="form-control"
                      placeholder="Describe your product..."
                      rows="3"
                      value={form.product_desc}
                      onChange={(e) => setForm({ ...form, product_desc: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Product Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <small className="text-muted d-block mt-2">
                      Upload an image file (JPG, PNG, GIF - Max 5MB). If not provided, a placeholder image will be used.
                    </small>
                    
                    {imagePreview && (
                      <div className="mt-3">
                        <p className="small fw-bold mb-2">Preview:</p>
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "5px" }}
                        />
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-success btn-lg w-100" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Adding...
                      </>
                    ) : (
                      "Add Product"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;