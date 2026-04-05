import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.email || !form.password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      console.log("🔐 Login attempt with:", form.email);
      const response = await API.post("/user/login", {
        email: form.email,
        password: form.password
      });

      console.log("✅ Login response:", response.data);
      const userData = response.data.user;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("✅ Data saved to localStorage");

      login({
        token: response.data.token,
        user: userData
      });

      console.log("✅ Login context updated");

      await new Promise(resolve => setTimeout(resolve, 100));

      const redirectPath = userData.role === "seller" ? "/seller-dashboard" : "/";
      console.log("🚀 Navigating to:", redirectPath);
      navigate(redirectPath);
      
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div style={{ maxWidth: "400px", width: "100%", padding: "0 20px" }}>
        <h2 className="text-center mb-4 fw-bold text-success">Login</h2>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div></div>
            <Link to="/forgot-password" className="text-success text-decoration-none">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn btn-success w-100 fw-bold" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register" className="text-success fw-bold">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;