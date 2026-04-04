import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const { isLoggedIn, username, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="top-accent-bar">
        Welcome to the Perfume Shop Collection! Free Shipping on all orders.
      </div>

      <nav className="nav-container">
        
        <div className="nav-logo">
          <button onClick={() => { navigate("/"); closeMenu(); }} style={{border: "none", background: "none", cursor: "pointer", padding: 0}}>
            <h2>Scentora</h2>
          </button>
        </div>

        <div 
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li><button onClick={() => { navigate("/"); closeMenu(); }} style={{border: "none", background: "none", cursor: "pointer", fontSize: "inherit", color: "inherit"}}>Home</button></li>
          <li><button onClick={() => { navigate("/products"); closeMenu(); }} style={{border: "none", background: "none", cursor: "pointer", fontSize: "inherit", color: "inherit"}}>Products</button></li>
          <li><button onClick={() => { navigate("/contact"); closeMenu(); }} style={{border: "none", background: "none", cursor: "pointer", fontSize: "inherit", color: "inherit"}}>Contact Us</button></li>

          {menuOpen && (
            <li className="mobile-auth-links">
              {!isLoggedIn ? (
                <button onClick={() => { navigate("/login"); closeMenu(); }} className="btn-primary" style={{border: "none", background: "inherit", cursor: "pointer", fontSize: "inherit", color: "inherit"}}>Login</button>
              ) : (
                <button className="btn-secondary" onClick={logout}>Logout</button>
              )}
            </li>
          )}
        </ul>

        <div className="nav-right">
          {!isLoggedIn ? (
            <button onClick={() => navigate("/login")} className="btn-primary" style={{border: "none", background: "inherit", cursor: "pointer", fontSize: "inherit", color: "inherit"}}>Login</button>
          ) : (
            <>
              <div
                className="account-dropdown"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button className="btn-secondary">Account</button>

                {showDropdown && (
                  <div className="dropdown-panel">
                    <p>{username}</p>
                    <button onClick={logout}>Logout</button>
                  </div>
                )}
              </div>

              <button onClick={() => navigate("/cart")} className="btn-primary" style={{border: "none", background: "inherit", cursor: "pointer", fontSize: "inherit", color: "inherit"}}>🛒 Cart</button>
            </>
          )}
        </div>

      </nav>
    </>
  );
}

export default Navbar;
