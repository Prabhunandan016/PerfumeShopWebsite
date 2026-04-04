import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { upload } from "./config/cloudinary.js";
import Product from "./models/productModel.js";

dotenv.config();

const app = express();

/* ------------------------------
   MIDDLEWARE
------------------------------ */
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({
  origin: corsOrigin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json());

/* ------------------------------
   CONNECT MONGO
------------------------------ */
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("❌ MONGODB_URI not set in .env file");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  });

/* ------------------------------
   CREATE PRODUCT (POST)
------------------------------ */
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    console.log("Incoming Product:", req.body);
    console.log("Incoming File:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Image file missing" });
    }

    const productData = {
      name: req.body.name,
      description: req.body.description,
      tag: req.body.tag,
      price: Number(req.body.price),
      discountPercentage: Number(req.body.discountPercentage),
      size: req.body.size,
      inStock: req.body.inStock === "true",
      image: req.file.path,   // CLOUDINARY URL (kept for backward compatibility)
      images: [req.file.path], // gallery images array
      reviews: [],
    };

    const product = await Product.create(productData);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.log("Upload Error:", err);
    res.status(500).json({
      error: "Product upload failed",
      details: err.message,
    });
  }
});

/* ------------------------------
   FETCH ALL PRODUCTS (GET)
------------------------------ */
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    console.log(`📦 Fetching products... Found: ${products.length} products`);
    console.log("Products:", products);
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ error: "Failed to fetch products", details: err.message });
  }
});

/* ------------------------------
   FETCH SINGLE PRODUCT BY ID (GET)
------------------------------ */
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product", details: err.message });
  }
});

/* ------------------------------
   SUBMIT REVIEW FOR PRODUCT (POST)
   Expects: { rating: Number, review: String }
------------------------------ */
app.post("/api/products/review/:id", async (req, res) => {
  try {
    const { rating, review } = req.body;
    if (!rating || !review || typeof review !== "string") {
      return res.status(400).json({ error: "Invalid rating or review" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.reviews.push({ rating: Number(rating), review: review.trim() });

    await product.save();

    res.json(product);
  } catch (err) {
    console.log("Review Error:", err);
    res.status(500).json({ error: "Failed to submit review", details: err.message });
  }
});

/* ------------------------------
   LOGIN ENDPOINT (POST)
   Expects: { username: String, password: String }
   Returns: { success: Boolean, message: String, username: String }
------------------------------ */
app.post("/api/auth/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
      res.json({
        success: true,
        message: "Login successful",
        username: adminUsername,
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

/* ------------------------------
   HEALTH CHECK ENDPOINT (GET)
------------------------------ */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

/* ------------------------------
   START SERVER
------------------------------ */
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

// "0.0.0.0" ensures it works on HOTSPOT / PHONE also
app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n🚀 Server Running on Port ${PORT}`);
  console.log(`📌 Products API   → http://localhost:${PORT}/api/products`);
  console.log(`📌 Upload API     → http://localhost:${PORT}/api/products (POST)`);
  console.log(`📌 Auth API       → http://localhost:${PORT}/api/auth/login (POST)`);
  console.log(`📌 Health Check   → http://localhost:${PORT}/api/health\n`);
});
