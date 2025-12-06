import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loginpage from "./pages/Loginpage";
import Contactus from "./pages/Contactus";
import ProductsPage from "./pages/Productspage";
import AdminUpload from "./pages/AdminUpload";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/Cartpage";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Loginpage />} /> 
        <Route path="/contact" element={<Contactus />} /> 
        <Route path="/products" element={<ProductsPage />} /> 
        <Route path="/admin/upload" element={<AdminUpload />} /> 
        <Route path="/product/:id" element={<ProductDetails />} />          
        <Route path="/cart" element={<CartPage />} />               
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
