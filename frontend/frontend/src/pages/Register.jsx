import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState("buyer");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      console.log("📝 Registration attempt with:", { name: form.name, email: form.email, role: userType });
      
      const res = await API.post("/user/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: userType,
      });

      console.log("✅ Signup response received:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("✅ Data saved to localStorage. User:", JSON.parse(localStorage.getItem("user")));

      login({
        token: res.data.token,
        user: res.data.user,
      });

      console.log("✅ Login context updated");

      await new Promise(resolve => setTimeout(resolve, 100));

      const redirectPath = userType === "seller" ? "/seller-dashboard" : "/";
      console.log("🚀 Navigating to:", redirectPath);
      navigate(redirectPath);
      
    } catch (err) {
      console.error("❌ Signup error:", err.response?.data || err.message);
      const errorMsg = 
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        err.message ||
        "Registration failed";
      console.error("Error message being shown:", errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4 fw-bold text-success">Register</h2>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Password</label>
          <input
            type="password"
            placeholder="Enter password (min 6 characters)"
            className="form-control"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength="6"
          />
          <small className="text-muted">Minimum 6 characters</small>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Account Type</label>
          <select
            className="form-control"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100 fw-bold" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account? <Link to="/login" className="text-success fw-bold">Login</Link>
      </p>
    </div>
  );
}

export default Register;