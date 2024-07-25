import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Admin = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  // const url = "http://localhost:5000";
  const url = "https://myproject-pi-ashy.vercel.app";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${url}/getAll`);
        setAllUsers(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = (invested, email) => {
    console.log(email)
    console.log(invested)
    axios.post(`${url}/approve`,{invested, email});
  };

  return (
    <>
      <button
        onClick={() => {
          navigate("/login");
          Cookies.remove("token");
        }}
      >
        Logout
      </button>
      <div> Total Users are {allUsers.length}</div>
      <div className="adminContainer">
        <div className="userContainer">
          {allUsers.map((user) => (
            <div key={user._id} className="userCard">
              <div>UserName: {user.name}</div>
              <div>Email: {user.email}</div>
              <div>Score: {user.score}</div>
              <div>Level: {user.level}</div>
              <div>Role: {user.role}</div>
              <div>TotalInvestment: {user.totalInvestment}</div>
              <div>Invested: {user.invested}</div>
              <div>Exchange: {user.exchange}</div>
              <div>Order No: {user.orderNo}</div>
              <div>
                Is Submit:{" "}
                {user.isSubmit ? (
                  <button onClick={handleApprove(user.email,user.invested)}>Approve</button>
                ) : (
                  "No"
                )}
              </div>
              <div>
                Referred:
                <ul>
                  {user.refer.map((username, index) => (
                    <li key={index}>{username}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;
