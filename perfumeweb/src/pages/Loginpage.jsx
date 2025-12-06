import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

function Loginpage() {
  const { login } = useAuth();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user === "Nandan" && pass === "123456789") {
      login("Nandan");
      window.location.href = "/";
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <label>Username</label>
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />

        <label>Password</label>
        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
}

export default Loginpage;
