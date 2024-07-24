import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";
import axios from "axios";

const Payment = () => {
  const token = Cookies.get("token");
  const decoded = jwtDecode(token);
  const LogedinUser = decoded._doc;
  const email = LogedinUser.email;
  const location = useLocation();
  const { plan } = location.state;
  const [method, setMethod] = useState("");
  const [address, setAddress] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:5000";

  useEffect(() => {
    if (method === "Binance") {
      setAddress("0xa7df37e92e6df2ff38f309101065e233d50da0c2");
    } else if (method === "OKX") {
      setAddress("0x708b64556e6d3f3cf6e9a9710d2333bff383c1d2");
    } else if (method === "Bybit") {
      setAddress("0x51ddd0c0c8e57aea18488700ccd301a0a0f55532");
    } else {
      setAddress("Please Select Payment Method");
    }
  }, [method]);

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handleSubmit = async (e) => {
    if (orderNo === "") {
      alert("Please Enter OrderNo");
    }

    const result = await axios.put(`${url}/addOrder`, { email, orderNo, plan });
    console.log(result);
  };

  return (
    <>
      <p
        className="back"
        onClick={() => {
          navigate("/welcome");
        }}
      >
        Back
      </p>
      <div className="container">
        <h1>Payment for ${plan}</h1>
        <select onChange={handleMethodChange}>
          <option value="">Select Payment Method</option>
          <option value="Binance">Binance</option>
          <option value="OKX">OKX</option>
          <option value="Bybit">Bybit</option>
        </select>
        <p
          onClick={() => {
            navigator.clipboard.writeText(address);
          }}
        >
          {address}
        </p>
        {address !== "Please Select Payment Method" ? (
          <div>
            <label className="lbl">
              Pelase Enter Order Number After Payment
            </label>
            <input
              type="Number"
              onChange={(e) => {
                setOrderNo(e.target.value);
              }}
              className="inpt"
            />
          </div>
        ) : null}
        <button onClick={handleSubmit} className="orderSubmitBtn">
          Submit
        </button>
      </div>
    </>
  );
};

export default Payment;
