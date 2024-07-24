import React from "react";
import "./Plans.css";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const navigate = useNavigate();

  const handleBuyClick = (plan) => {
    navigate("/payment", { state: { plan } });
  };

  return (
    <div className="container">
      <div className="card">
        <p className="title">2$ Investment</p>
        <p className="description">Earn 0.3$ per day</p>
        <button
          className="crdBtn"
          onClick={() => handleBuyClick(2)}
        >
          Buy
        </button>
      </div>
      <div className="card">
        <p className="title">5$ Investment</p>
        <p className="description">Earn 0.6$ per day</p>
        <button className="crdBtn" onClick={() => handleBuyClick(5)}>Buy</button>
      </div>
      <div className="card">
        <p className="title">10$ Investment</p>
        <p className="description">Earn 0.9$ per day</p>
        <button className="crdBtn" onClick={() => handleBuyClick(10)}>Buy</button>
      </div>
    </div>
  );
};
export default Plans;
