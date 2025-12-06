import { useEffect, useState } from "react";
import "../styles/CartPage.css";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [success, setSuccess] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  // Update localStorage whenever cart changes
  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Increase quantity
  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  };

  // Remove item completely
  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    updateCart(updated);
  };

  // Checkout success popup
  const handleBuyNow = () => {
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setCart([]);
      localStorage.removeItem("cart");
    }, 2000);
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0
  );

  return (
    <div className="cart-wrapper">

      <h1 className="cart-heading">Your Cart</h1>

      {/* SUCCESS POPUP */}
      {success && (
        <div className="success-popup">
          ✅ Order Successful!
        </div>
      )}

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-container">

          {cart.map((item) => (
            <div className="cart-card" key={item._id}>
              
              <img src={item.image} alt={item.name} className="cart-img" />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p className="cart-price">₹{item.finalPrice}</p>

                {/* Quantity buttons */}
                <div className="qty-box">
                  <button onClick={() => decreaseQty(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item._id)}>+</button>
                </div>

                <button className="remove-btn" onClick={() => removeItem(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* TOTAL SECTION */}
          <div className="total-box">
            <h2>Total: ₹{totalAmount}</h2>
            <button className="buy-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default CartPage;
