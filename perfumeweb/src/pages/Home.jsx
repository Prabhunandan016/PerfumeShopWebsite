import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "../styles/ProductsPage.css";

// API base URL from environment variables
const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/api/products`);
        const data = await res.json();
        // show latest 4 products
        setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    }
    load();
  }, []);

  return (
    <div className="home-wrapper">

      {/* HERO / CTA BANNER */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Signature Scent</h1>
          <p className="hero-sub">Handpicked fragrances — crafted for moments that matter.</p>
          <div className="hero-actions">
            <button className="cta-btn" onClick={() => navigate('/products')}>Explore Collections</button>
            <button className="secondary-btn" onClick={() => navigate('/contact')}>Contact Us</button>
          </div>
        </div>

        {/* Poster placeholder: replace with your image path */}
        <div className="hero-poster" aria-hidden>
          <img 
            src="poster.png" 
            alt="Featured Perfume Poster"
            className="poster-image"
          />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured">
        <h2 className="section-title">Featured Perfumes</h2>
        <div className="featured-grid products-grid">
          {products.length === 0 && <p className="muted">No products available yet.</p>}

          {products.map((p) => (
            <div
              key={p._id}
              className="product-card"
              onClick={() => navigate(`/product/${p._id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/product/${p._id}`)}
            >
              {p.discountPercentage > 0 && (
                <span className="discount-tag">{p.discountPercentage}% OFF</span>
              )}

              <img src={(p.images && p.images[0]) || p.image} alt={p.name} className="product-image" />

              <h3 className="product-name">{p.name}</h3>

              <p className="product-tag">{(p.tag || "").toUpperCase()}</p>

              <p className="product-size">Size: {p.size}</p>

              <p className="product-price">
                {p.discountPercentage > 0 ? (
                  <>
                    <span className="old-price">₹{p.price}</span>
                    <span className="new-price">₹{p.finalPrice}</span>
                  </>
                ) : (
                  <span className="new-price">₹{p.price}</span>
                )}
              </p>

              <button className="product-btn">View</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
