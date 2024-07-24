import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const notify = (notifyText) => toast(notifyText);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const url = "http://localhost:5000";
  const url = "https://myproject-pi-ashy.vercel.app";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };

    try {
      const result = await axios.post(`${url}/login`, formData);
      if (result.data === "User not found") {
        notify("User not found");
        // setTimeout(() => {
        //   navigate("/");
        // }, 2000);
      } else if (result.data === "Password Incorrect") {
        notify("Password Incorrect");
      } else if (result.data.role === "admin") {
        localStorage.setItem('user', JSON.stringify(result.data));
        navigate("/admin");
      } else {
        localStorage.setItem('user', JSON.stringify(result.data));
        navigate("/welcome");
      }
    } catch (error) {
      console.error("Error during login:", error);
      notify("An error occurred during login");
    }
  };

  return (
    <>
    <ToastContainer />
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
            </>
  );
};

export default Login;
