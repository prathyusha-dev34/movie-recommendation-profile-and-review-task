import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      // Create FormData
      const formData = new FormData();

      formData.append(
        "username",
        email
      );

      formData.append(
        "password",
        password
      );

      // API Request
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        formData
      );

      // Store token
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      alert("Login Successful");

      // Redirect
      window.location.href = "/";

    } catch (error) {

      console.log(error);

      alert("Invalid credentials");

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleLogin}
      >

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );
}

export default Login;