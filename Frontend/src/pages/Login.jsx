import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Connexion() {
  const [credentials, setCredentials] = useState({ mail: "", password: "" });

  const { login } = useAuth();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    setLoginError(null);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const status = await login(credentials);

      if (status === "success") {
        localStorage.setItem("loginSuccess", "true");
        setShowLoginPopup(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);

      if (error.message === "Email not found") {
        setLoginError("Email not found. Please check your email.");
      } else if (error.message === "Incorrect password") {
        setLoginError("Incorrect password. Please try again.");
      } else {
        setLoginError("Email not found. Please check your email.");
      }
    }
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
    navigate("/");
  };

  return (
    <>
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="form-container">
          <label>
            Mail:
            <input
              type="email"
              name="mail"
              value={credentials.mail}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
