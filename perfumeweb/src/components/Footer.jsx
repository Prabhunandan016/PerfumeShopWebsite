import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">Scentora</div>
        <nav className="footer-links">
          <a href="/" className="footer-link">Home</a>
          <a href="/products" className="footer-link">Products</a>
          <a href="/contact" className="footer-link">Contact</a>
        </nav>
        <div className="footer-social">
          <a href="https://instagram.com" className="footer-social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.567 5.784 2.296 7.15 2.234 8.416 2.176 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.396 3.757 1.299c-.902.902-1.168 2.014-1.227 3.295C2.013 5.668 2 6.077 2 9.335v5.33c0 3.258.013 3.667.072 4.948.059 1.281.325 2.393 1.227 3.295.902.902 2.014 1.168 3.295 1.227 1.281.059 1.69.072 4.948.072s3.667-.013 4.948-.072c1.281-.059 2.393-.325 3.295-1.227.902-.902 1.168-2.014 1.227-3.295.059-1.281.072-1.69.072-4.948v-5.33c0-3.258-.013-3.667-.072-4.948-.059-1.281-.325-2.393-1.227-3.295-.902-.902-2.014-1.168-3.295-1.227C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
          <a href="https://facebook.com" className="footer-social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0"/></svg>
          </a>
          <a href="mailto:info@perfume.com" className="footer-social-icon" aria-label="Email">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065l-11.99-7.065v14.13c0 .553.447 1 1 1h21.98c.553 0 1-.447 1-1v-14.13l-11.99 7.065zm11.99-9.065c0-.553-.447-1-1-1h-21.98c-.553 0-1 .447-1 1v.217l12 7.083 11.98-7.083v-.217z"/></svg>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Scentora. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
