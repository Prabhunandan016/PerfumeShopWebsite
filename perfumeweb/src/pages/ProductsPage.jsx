// ProductsPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductsPage.css";

// API base URL from environment variables
const API = import.meta.env.VITE_API_URL;
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function ProductsPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("none");
  const [discountFilter, setDiscountFilter] = useState("none");

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(`${API}/api/products`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    }
    loadData();
  }, []);

  // FILTER LOGIC
  useEffect(() => {
    let temp = [...products];

    if (categoryFilter !== "all") {
      temp = temp.filter((item) => item.tag === categoryFilter);
    }

    if (priceFilter === "low-high") {
      temp.sort((a, b) => a.finalPrice - b.finalPrice);
    } else if (priceFilter === "high-low") {
      temp.sort((a, b) => b.finalPrice - a.finalPrice);
    }

    if (discountFilter === "high-low") {
      temp.sort((a, b) => b.discountPercentage - a.discountPercentage);
    } else if (discountFilter === "low-high") {
      temp.sort((a, b) => a.discountPercentage - b.discountPercentage);
    }

    setFilteredProducts(temp);
  }, [categoryFilter, priceFilter, discountFilter, products]);


  // ----------------------------
  // 🛒 ADD TO CART (requires login)
  // ----------------------------
  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    addToCart(product);
    // small confirmation (could be replaced with a toast)
    alert("Added to cart!");
  };

  const openLogin = () => {
    setShowLoginPrompt(false);
    navigate("/login");
  };

  const closePrompt = () => setShowLoginPrompt(false);

  return (
    <div className="products-wrapper">
      <h1 className="products-heading">Our Collection</h1>

      {/* FILTERS */}
      <div className="filters-container">
        <select
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Products</option>
          <option value="perfume">Perfume</option>
          <option value="attar">Attar</option>
        </select>

        <select
          className="filter-select"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="none">Sort by Price</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>

        <select
          className="filter-select"
          value={discountFilter}
          onChange={(e) => setDiscountFilter(e.target.value)}
        >
          <option value="none">Sort by Discount</option>
          <option value="high-low">High → Low</option>
          <option value="low-high">Low → High</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="products-grid">
        {filteredProducts.map((item) => (
          <div
            className="product-card"
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
          >
            {item.discountPercentage > 0 && (
              <span className="discount-tag">{item.discountPercentage}% OFF</span>
            )}

            <img src={item.image} alt={item.name} className="product-image" />

            <h3 className="product-name">{item.name}</h3>

            <p className="product-tag">{item.tag.toUpperCase()}</p>

            <p className="product-size">Size: {item.size}</p>

            <p className="product-price">
              {item.discountPercentage > 0 ? (
                <>
                  <span className="old-price">₹{item.price}</span>
                  <span className="new-price">₹{item.finalPrice}</span>
                </>
              ) : (
                <span className="new-price">₹{item.price}</span>
              )}
            </p>

            <button className="product-btn" onClick={(e) => handleAddToCart(e, item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {showLoginPrompt && (
        <div className="login-modal-backdrop" onClick={closePrompt}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Please log in</h3>
            <p>You need to be logged in to add items to your cart.</p>
            <div className="login-modal-actions">
              <button className="modal-btn modal-primary" onClick={openLogin}>
                Go to Login
              </button>
              <button className="modal-btn" onClick={closePrompt}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
