import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-success text-white mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="fw-bold mb-2">SAMADHAN</h6>
            <p className="small mb-0">Fresh farm products delivered to your door</p>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="fw-bold mb-2">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
              <li><Link to="/register" className="text-white text-decoration-none">Register</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold mb-2">Contact</h6>
            <p className="small mb-1">Email: info@samadhan.com</p>
            <p className="small mb-0">Phone: +91 XXXX-XXX-XXX</p>
          </div>
        </div>

        <hr className="my-3" style={{ borderColor: "rgba(255,255,255,0.3)" }} />

        <div className="text-center small">
          <p className="mb-0">© 2026 SAMADHAN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
