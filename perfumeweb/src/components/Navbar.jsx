import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar() {
  const { isLoggedIn, username, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="top-accent-bar">
        Welcome to the Perfume Shop Collection! Free Shipping on all orders.
      </div>

      <nav className="nav-container">
        
        <div className="nav-logo">
          <a href="/" onClick={closeMenu}>
            <h2>Scentora</h2>
          </a>
        </div>

        <div 
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li><a href="/" onClick={closeMenu}>Home</a></li>
          <li><a href="/products" onClick={closeMenu}>Products</a></li>
          <li><a href="/contact" onClick={closeMenu}>Contact Us</a></li>

          {menuOpen && (
            <li className="mobile-auth-links">
              {!isLoggedIn ? (
                <a className="btn-primary" href="/login">Login</a>
              ) : (
                <button className="btn-secondary" onClick={logout}>Logout</button>
              )}
            </li>
          )}
        </ul>

        <div className="nav-right">
          {!isLoggedIn ? (
            <a className="btn-primary" href="/login">Login</a>
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

              <a href="/cart" className="btn-primary">🛒 Cart</a>
            </>
          )}
        </div>

      </nav>
    </>
  );
}

export default Navbar;
