import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },

    tag: { type: String, enum: ["perfume", "attar"], required: true },

    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },

    finalPrice: { type: Number },

    // backward-compatible single image and new images array for gallery
    image: { type: String, required: true },
    images: { type: [String], default: [] },

    // reviews: array of objects { rating, review }
    reviews: {
      type: [
        {
          rating: { type: Number, required: true },
          review: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },

    avgRating: { type: Number, default: 0 },

    size: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ----------------------------------------------------------
// FIXED PRE-SAVE HOOK (Mongoose 7+) — NO MORE next() ERROR
// ----------------------------------------------------------
ProductSchema.pre("save", function () {

  // discount calculation
  this.finalPrice =
    this.price - (this.price * this.discountPercentage) / 100;

  // average rating calculation from reviews
  if (this.reviews && this.reviews.length > 0) {
    this.avgRating =
      this.reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / this.reviews.length;
  } else {
    this.avgRating = 0;
  }
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
