import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

import App from "./App.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import "./styles/index.css";

function PrivateRoute({ element, requiresAuth, allowedRoles }) {
  const { user, setUser, loading: authLoading } = useAuth();

  if (requiresAuth && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/login" />;
  }
  return element;
}

function Main() {
  const { user, setUser, loading: authLoading } = useAuth();

  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");

    if (user && loginSuccess) {
      localStorage.removeItem("loginSuccess");
      setUser((prevUser) => ({ ...prevUser }));
    }
  }, [user, setUser]);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/login/"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
