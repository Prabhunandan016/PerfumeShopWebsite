import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);      // user selected rating
  const [review, setReview] = useState("");     // review text
  const [allReviews, setAllReviews] = useState([]);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`${API}/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setAllReviews(data.reviews || []);
        // choose main image from images array if available, else fallback to image
        const img = (data.images && data.images.length > 0) ? data.images[0] : data.image;
        setMainImage(img || "");
      } catch (err) {
        console.log("Error loading product:", err);
      }
    }
    loadProduct();
  }, [id]);

  if (!product) return <p className="loading">Loading product...</p>;

  // -----------------------
  // SEND RATING + REVIEW
  // -----------------------
  const submitReview = async () => {
    if (!rating || review.trim() === "") {
      alert("Please select rating & write a review.");
      return;
    }

    const res = await fetch(`${API}/api/products/review/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, review }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.error || "Failed to submit review");
      return;
    }

    const data = await res.json();
    setAllReviews(data.reviews || []);
    setProduct(data); // update avgRating shown
    setRating(0);
    setReview("");
  };

  return (
    <div className="details-wrapper">

          {/* BACK (left) and SHARE (right) */}
          <button className="back-btn back-left" onClick={() => navigate("/products")} aria-label="Back to products" title="Back to products">Back</button>
          <button
            className="share-btn share-left"
            onClick={async () => {
                const shareData = {
                  title: product.name,
                  text: product.description?.slice(0, 120),
                  url: window.location.href,
                };
                try {
                  if (navigator.share) {
                    await navigator.share(shareData);
                  } else {
                    await navigator.clipboard.writeText(window.location.href);
                    alert("Product link copied to clipboard");
                  }
                } catch (err) {
                  console.log("Share failed:", err);
                  alert("Unable to share");
                }
              }}
          >
            Share
          </button>

      {/* CONTENT */}
      <div className="details-container">

        {/* LEFT IMAGE / Gallery */}
        <div className="details-image-box">
          {mainImage ? (
            <>
              <img src={mainImage} alt={product.name} />
              <div className="gallery-thumbs">
                {(product.images && product.images.length > 0 ? product.images : [product.image]).map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`${product.name} ${idx}`}
                    className={`thumb ${src === mainImage ? "active" : ""}`}
                    onClick={() => setMainImage(src)}
                  />
                ))}
              </div>
            </>
          ) : (
            <img src={product.image} alt={product.name} />
          )}
        </div>

        {/* RIGHT DATA */}
        <div className="details-info">
          <h1>{product.name}</h1>

          <p className="details-tag">{product.tag.toUpperCase()}</p>

          <p className="details-description">{product.description}</p>

          <p className="details-size">Size: {product.size}</p>

          <p className="details-price">
            {product.discountPercentage > 0 ? (
              <>
                <span className="old-price">₹{product.price}</span>
                <span className="new-price">₹{product.finalPrice}</span>
              </>
            ) : (
              <span className="new-price">₹{product.price}</span>
            )}
          </p>

          <p className="details-stock">
            {product.inStock ? "✔ In Stock" : "❌ Out of Stock"}
          </p>

          <p className="details-rating">
            ⭐ Average Rating: {(product.avgRating || 0).toFixed(1)}
          </p>

          {/* Rating Input */}
          <div className="rating-box">
            <label>Your Rating:</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              <option value="0">Select</option>
              <option value="1">⭐ 1</option>
              <option value="2">⭐ 2</option>
              <option value="3">⭐ 3</option>
              <option value="4">⭐ 4</option>
              <option value="5">⭐ 5</option>
            </select>
          </div>

          {/* Review Input */}
          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="review-box"
          />

          <button className="submit-review-btn" onClick={submitReview}>
            Submit Review
          </button>
        </div>
      </div>

      {/* REVIEWS LIST */}
      <div className="reviews-section">
        <h2>Reviews</h2>

        {allReviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          allReviews.map((r, index) => (
            <div className="review-card" key={index}>
              <p className="review-rating">⭐ {r.rating}</p>
              <p className="review-text">{r.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
