import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url = "http://localhost:5000";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };

    await axios
      .post(`${url}/login`, formData, { withCredentials: true })
      .then((result) => {
        if (result.data === "User not found") {
          alert("User not found");
        } else if (result.data === "Password Incorrect") {
          alert("Password Incorrect");
        } else {
          const token = Cookies.get("token");
          const decoded = jwtDecode(token);
          console.log(result.data.role,28)
          if ((result.data.role === "admin")) {
            navigate("/admin");
          } else {
            navigate("/welcome");
          }
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="innerForm">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="submit-button">
          Login
        </button>
        <p className="already">
          Don't have Account?{" "}
          <span
            className="cursor"
            onClick={() => {
              navigate("/");
            }}
          >
            Signup Here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
