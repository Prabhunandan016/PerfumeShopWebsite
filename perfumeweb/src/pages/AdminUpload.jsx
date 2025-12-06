import { useState } from "react";
import "../styles/AdminUpload.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminUpload() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    tag: "perfume",
    price: "",
    discountPercentage: "",
    size: "",
    inStock: true,
  });

  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!image) {
      setMsg("Please upload an image");
      return;
    }

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    data.append("image", image);

    try {
      const res = await fetch(`${API}/api/products`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        setMsg("✔ Product uploaded successfully!");
      } else {
        setMsg("❌ Upload failed: " + result.error);
      }
    } catch (err) {
      setMsg("❌ Server Error");
      console.log(err);
    }
  }

  return (
    <div className="admin-upload-container">
      <h1>Upload New Product</h1>

      {msg && <p className="upload-msg">{msg}</p>}

      <form onSubmit={handleSubmit} className="upload-form">

        <label>Name</label>
        <input type="text" name="name" required onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" required onChange={handleChange}></textarea>

        <label>Category Tag</label>
        <select name="tag" onChange={handleChange}>
          <option value="perfume">Perfume</option>
          <option value="attar">Attar</option>
        </select>

        <label>Price</label>
        <input type="number" name="price" required onChange={handleChange} />

        <label>Discount %</label>
        <input type="number" name="discountPercentage" onChange={handleChange} />

        <label>Size</label>
        <input type="text" name="size" required onChange={handleChange} />

        <label>In Stock?</label>
        <select name="inStock" onChange={handleChange}>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        <label>Image Upload</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" className="upload-btn">
          Upload Product
        </button>
      </form>
    </div>
  );
}

export default AdminUpload;
