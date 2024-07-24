import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signupPage.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refer, setrefer] = useState(null);
  const url = "http://localhost:5000";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, password, refer };

    try {
      const result = await axios.post(`${url}/signup`, formData);
      if (result.data === "User already exists") {
        alert("User already exists");
      } else if (result.data === "Provided refer user does not Exist") {
        alert("Provided refer user does not Exist");
      } else if (result.data === "username Already exist") {
        alert("username Already exist");
      } else {
        const username = result.data.name;
        if (refer !== null) {
          await axios.put(`${url}/addrefer`, { refer, username });
        }
        navigate("/login");
      }
    } catch (error) {
      console.error("There was an error during signup:", error);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="innnerform">
        <label>User Name</label>
        <input
          type="text"
          placeholder="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Who Invited You?</label>
        <input
          type="refercode"
          placeholder="refer Code"
          value={refer}
          onChange={(e) => setrefer(e.target.value)}
        />
        <button type="submit">Signup</button>
        <p className="already">
          Already have Account?{" "}
          <span
            className="cursor"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login Here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Signup;
