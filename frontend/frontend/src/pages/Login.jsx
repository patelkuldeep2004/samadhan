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
      <div style={{ maxWidth: "420px", width: "100%", padding: "0 20px" }}>
        
        {/* Logo */}
        <div className="text-center mb-4 fade-in-down">
          <img src="/logo.png" alt="Samadhan" style={{ width: '80px', height: '80px', borderRadius: '16px', marginBottom: '12px' }} />
          <h2 className="fw-bold" style={{ letterSpacing: '2px', fontSize: '1.6rem' }}>Welcome Back</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Sign in to your Samadhan account</p>
        </div>

        <div className="card shadow-lg border-0 fade-in-up" style={{ borderRadius: '16px' }}>
          <div className="card-body p-4">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" className="btn-close" onClick={() => setError(null)}></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold" style={{ fontSize: '13px' }}>Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold" style={{ fontSize: '13px' }}>Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <div className="d-flex justify-content-end mb-3">
                <Link to="/forgot-password" className="text-decoration-none" style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="btn btn-success btn-lg w-100 fw-bold" disabled={loading} style={{ borderRadius: '12px' }}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" style={{ width: '1rem', height: '1rem' }}></span>
                    Logging in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-4 text-center fade-in-up delay-2" style={{ fontSize: '14px' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;