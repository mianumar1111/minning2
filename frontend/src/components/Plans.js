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
        <p className="title">10$ Investment</p>
        <p className="description">Earn 25% Every 12 Hours</p>
        <button className="crdBtn" onClick={() => handleBuyClick(10)}>
          Buy
        </button>
      </div>
      <div className="card">
        <p className="title">30$ Investment</p>
        <p className="description">Earn 25% Every 12 Hours</p>
        <button className="crdBtn" onClick={() => handleBuyClick(30)}>
          Buy
        </button>
      </div>
      <div className="card">
        <p className="title">50$ Investment</p>
        <p className="description">Earn 25% Every 12 Hours</p>
        <button className="crdBtn" onClick={() => handleBuyClick(50)}>
          Buy
        </button>
      </div>
    </div>
  );
};
export default Plans;
