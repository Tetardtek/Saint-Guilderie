import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [user, setUser] = useState({
    pseudo: "",
    mail: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    pseudo: "",
    mail: "",
    password: "",
    confirmPassword: "",
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

const handleSignup = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasErrors = false;

    const requiredFields = ["pseudo", "mail", "password", "confirmPassword"];

    requiredFields.forEach((field) => {
        if (!user[field].trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: "This field is required",
            }));
            hasErrors = true;
        }
    });

    if (user.password.length < 6) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Password must be at least 6 characters long",
        }));
        hasErrors = true;
    }

    if (user.password !== user.confirmPassword) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: "Passwords do not match",
        }));
        hasErrors = true;
    }

    if (!emailRegex.test(user.mail)) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Invalid email address",
        }));
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    try {
        const signupResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            }
        );

        if (signupResponse.ok) {
            const data = await signupResponse.json();
            const { token } = data;

            localStorage.setItem("token", token);

            logout();
            
            setShowSignupPopup(true);
         
        } else {
            const responseData = await signupResponse.json();
            if (
                signupResponse.status === 400 &&
                responseData.message === "Email already registered."
            ) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "Email already registered",
                }));
            } else {
                console.error("Error during signup:", signupResponse.statusText);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    general: "Error during signup",
                }));
            }
        }
    } catch (catchedError) {
        console.error("Error during signup:", catchedError);
        setErrors((prevErrors) => ({
            ...prevErrors,
            general: "An unexpected error occurred",
        }));
    }
};

  return (
    <>
      <div className="page-container">
        <div className="auth-form">
          <h2>Signup</h2>
          {errors.general && <p className="error-message">{errors.general}</p>}
          <form onSubmit={handleSignup} className="form-container">
            <label>
              Pseudo:
              <input
                type="text"
                name="pseudo"
                value={user.pseudo}
                onChange={handleInputChange}
              />
            </label>
            {errors.pseudo && <p className="error-message">{errors.pseudo}</p>}

            <label>
              Mail:
              <input
                type="email"
                name="mail"
                value={user.mail}
                onChange={handleInputChange}
                className={errors.mail && "error-input"}
              />
            </label>
            {errors.mail && <p className="error-message">{errors.mail}</p>}

            <label>
              Password:
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className={errors.password && "error-input"}
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </label>

            <label>
              Confirm Password:
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword && "error-input"}
              />
            </label>
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}

            <button type="submit">Signup</button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
