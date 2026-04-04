# Perfume Shop - Full Stack Web Application

A modern, responsive e-commerce platform for perfume shopping built with **React**, **Node.js**, and **MongoDB**. Features include product listings, detailed product pages with reviews, image galleries, user authentication, and shopping cart functionality.

---

## 📋 Project Overview

**Perfume Shop** is a full-stack web application that allows users to:
- Browse a curated collection of perfumes
- View detailed product information with image galleries
- Read and submit product reviews with ratings
- Share products on social media
- Add products to cart (login required)
- Admin panel to upload new products

### Tech Stack
- **Frontend:** React (Vite) + CSS3
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Image Storage:** Cloudinary
- **Authentication:** Custom JWT/LocalStorage

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)

### Installation

#### 1. Clone and Setup Backend

```bash
cd Perfumeproject/backend
npm install
```

Create a `.env` file in the backend folder:
```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

Start the backend server:
```bash
node index.js
```

Expected output:
```
🚀 Server Running on Port 5000
📌 Products API → http://localhost:5000/api/products
📌 Upload API   → http://localhost:5000/api/products (POST)

MongoDB Connected
```

#### 2. Setup Frontend

```bash
cd Perfumeproject/perfumeweb
npm install
npm run dev
```

The app will open at `http://localhost:5173`

---

## 📱 Features & Pages

### **Homepage (`/`)**
- Hero banner with call-to-action buttons
- Featured products grid (4 products)
- Responsive design with smooth animations
- Quick navigation to products and contact

### **Products Page (`/products`)**
- Grid layout showing all perfumes
- **Filters:**
  - Category (Perfume, Attar)
  - Price (Low to High, High to Low)
  - Discount (High to Low, Low to High)
- Product cards with discount badges
- Click to view product details

### **Product Details Page (`/product/:id`)**
- Full product information
- **Image Gallery:** Multiple images with thumbnail selection
- **Share Button:** Share on social media or copy link
- **Average Rating:** Star rating based on reviews
- **Reviews Section:**
  - View existing reviews with ratings
  - Submit new review with rating (1-5 stars) and comment
- **Add to Cart:** Button to add product (requires login)
- Back button for navigation

### **Cart Page (`/cart`)**
- View added products
- Quantity management
- Total price calculation
- Checkout (ready to extend)

### **Login Page (`/login`)**
- User authentication
- Persists login state in localStorage
- Required for adding to cart

### **Contact Page (`/contact`)**
- Contact form for inquiries
- Business information

### **Admin Upload Page (`/admin/upload`)**
- Add new products to the database
- Fields: Name, Description, Price, Discount, Size, Tag, Stock Status
- Image upload to Cloudinary
- Success confirmation

---

## 🗄️ Database Schema

### Product Model
```javascript
{
  name: String (required),
  description: String (required),
  tag: String (enum: ["perfume", "attar"]),
  price: Number (required),
  discountPercentage: Number (default: 0),
  finalPrice: Number (auto-calculated),
  image: String (Cloudinary URL),
  images: [String] (gallery images),
  reviews: [
    {
      rating: Number (1-5),
      review: String,
      createdAt: Date
    }
  ],
  avgRating: Number (auto-calculated),
  size: String (required),
  inStock: Boolean (default: true),
  timestamps: true
}
```

---

## 🛠️ API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Fetch all products |
| GET | `/api/products/:id` | Fetch single product by ID |
| POST | `/api/products` | Create new product (with image upload) |
| POST | `/api/products/review/:id` | Submit review for product |

---

## 📤 How to Add Products

### **Method 1: Using Admin Upload Page (GUI)**

1. **Start both backend and frontend**
   ```bash
   # Terminal 1 - Backend
   cd Perfumeproject/backend
   node index.js

   # Terminal 2 - Frontend
   cd Perfumeproject/perfumeweb
   npm run dev
   ```

2. **Navigate to Admin Upload**
   - Open `http://localhost:5173/admin/upload`
   - Or click "Admin Upload" in navigation menu

3. **Fill Product Form**
   - **Product Name:** (e.g., "Jasmine Elegance")
   - **Description:** (e.g., "A floral fragrance with notes of jasmine and vanilla")
   - **Price:** (e.g., "₹1500")
   - **Discount Percentage:** (e.g., "10" for 10% off)
   - **Size:** (e.g., "50ml")
   - **Tag:** Select "Perfume" or "Attar"
   - **In Stock:** Check/uncheck
   - **Image:** Upload image (jpg, jpeg, png)

4. **Submit**
   - Click "Upload Product" button
   - Success message will appear
   - Product will appear on homepage and products page

### **Method 2: Using Postman (API)**

1. **Create POST request to:**
   ```
   http://localhost:5000/api/products
   ```

2. **Set Headers:**
   - Content-Type: multipart/form-data

3. **Add Form Data:**
   | Key | Value |
   |-----|-------|
   | name | Jasmine Elegance |
   | description | A floral fragrance with notes of jasmine and vanilla |
   | price | 1500 |
   | discountPercentage | 10 |
   | size | 50ml |
   | tag | perfume |
   | inStock | true |
   | image | (select image file) |

4. **Send Request**
   - Response will include created product with MongoDB ID

### **Method 3: Using cURL**

```bash
curl -X POST http://localhost:5000/api/products \
  -F "name=Jasmine Elegance" \
  -F "description=A floral fragrance with notes of jasmine and vanilla" \
  -F "price=1500" \
  -F "discountPercentage=10" \
  -F "size=50ml" \
  -F "tag=perfume" \
  -F "inStock=true" \
  -F "image=@/path/to/image.jpg"
```

---

## 🔐 User Features

### **Login & Cart**
- Users must login before adding to cart
- Login state persists in localStorage
- Cart data is stored locally
- Cart displays on `/cart` page

### **Reviews**
- All users can read reviews
- Users can submit reviews with ratings (1-5 stars)
- Reviews are immediately saved to database
- Average rating auto-updates

### **Product Sharing**
- Click "Share" button on product details
- Desktop: Uses native `navigator.share` (or falls back to copy link)
- Mobile: Opens native share dialog

---

## 📁 Project Structure

```
Perfumeproject/
├── backend/
│   ├── models/
│   │   └── productModel.js        # Product schema & model
│   ├── config/
│   │   └── cloudinary.js          # Cloudinary setup
│   ├── index.js                   # Main Express server
│   ├── package.json
│   └── .env                       # Environment variables
│
└── perfumeweb/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx         # Navigation bar
    │   │   └── Footer.jsx         # Footer
    │   ├── pages/
    │   │   ├── Home.jsx           # Homepage
    │   │   ├── Productspage.jsx   # Products listing
    │   │   ├── ProductDetails.jsx # Single product page
    │   │   ├── Cartpage.jsx       # Shopping cart
    │   │   ├── Loginpage.jsx      # Login/Register
    │   │   ├── Contactus.jsx      # Contact page
    │   │   └── AdminUpload.jsx    # Admin panel
    │   ├── context/
    │   │   ├── AuthContext.jsx    # Auth state management
    │   │   └── CartContext.jsx    # Cart state management
    │   ├── styles/
    │   │   ├── Home.css
    │   │   ├── ProductsPage.css
    │   │   ├── ProductDetails.css
    │   │   ├── Navbar.css
    │   │   └── ... other styles
    │   ├── App.jsx                # Main app & routing
    │   └── main.jsx               # React entry point
    ├── package.json
    └── vite.config.js
```

---

## 🎨 Key Features Showcase

### Product Gallery
- Multiple images per product
- Click thumbnails to switch main image
- Smooth transitions and hover effects

### Smart Filtering
- Filter by product category
- Sort by price (ascending/descending)
- Sort by discount percentage
- Real-time filtering

### Review System
- 5-star rating system
- Text reviews with timestamps
- Average rating calculation
- Persistent storage in MongoDB

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Smooth animations and transitions
- Touch-friendly buttons and inputs

---

## 🔧 Configuration

### Cloudinary Setup
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the dashboard
3. Add to `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### MongoDB Setup
- **Local:** Install MongoDB and run `mongod`
- **Cloud:** Use MongoDB Atlas and update connection string in `backend/index.js`

---

## 🧪 Testing the Application

### 1. **Add a Product**
   - Go to `/admin/upload`
   - Fill form and upload product
   - Verify it appears on homepage and products page

### 2. **View Product Details**
   - Click any product card
   - Verify all details load correctly
   - Check image gallery and share button

### 3. **Submit Review**
   - On product page, select rating
   - Write review text
   - Click "Submit Review"
   - Verify review appears immediately

### 4. **Test Add to Cart**
   - Try clicking "Add to Cart" without login
   - Should show login prompt
   - Login and try again
   - Should add to cart successfully

### 5. **Test Filters**
   - Use category/price/discount filters
   - Verify products update correctly
   - Click filtered product to view details

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check MongoDB is running; verify `.env` file |
| Images not uploading | Verify Cloudinary credentials in `.env` |
| Products not showing | Ensure backend is running on port 5000 |
| Cart data lost | Check browser's localStorage settings |
| Reviews not saving | Verify MongoDB connection and product ID |

---

## 📸 Screenshots

After testing, take screenshots of:
1. Homepage with featured products
2. Products page with filters
3. Product details with reviews
4. Admin upload page
5. Cart page
6. Login page

Include these in your submission zip file.

---

## 📝 Submission Checklist

- [ ] Backend running and tested
- [ ] Frontend working without errors
- [ ] At least 3-4 products added via admin
- [ ] Reviews tested and displaying
- [ ] Share button working
- [ ] Login and cart functionality verified
- [ ] Responsive design checked on mobile
- [ ] Screenshots captured
- [ ] README.md included
- [ ] Project zipped and ready

---

## 📧 Support

For questions or issues:
- Check the terminal for error messages
- Verify all `.env` variables are correct
- Ensure MongoDB is running
- Check network requests in browser DevTools

---

## 📄 License

LOGIN USERNAME= Nandan
password=123456789

This project is created for Olcademy .

---

