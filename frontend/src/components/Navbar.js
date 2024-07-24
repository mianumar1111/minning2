import React, { useState } from "react";
import Welcome from "./Welcome";
import Friends from "./Friends";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Plans from "./Plans";
import Payment from "./Payment";

const Navbar = () => {
  const [activeState, setActiveState] = useState("home");
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    navigate("/login");
    Cookies.remove("token");
  };

  return (
    <>
      <div>
        <ul className="navUl">
          <li
            className="navLi"
            onClick={(e) => {
              setActiveState("home");
            }}
          >
            Home
          </li>
          <li
            className="navLi"
            onClick={(e) => {
              setActiveState("friends");
            }}
          >
            Friends
          </li>
          <li
            className="navLi"
            onClick={(e) => {
              setActiveState("Investments");
            }}
          >
            Investments
          </li>
          <li
            className="navLi"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </li>
        </ul>
      </div>
      {activeState === "home" ? <Welcome /> : activeState==='friends'? <Friends />:activeState==='Investments'? <Plans/>:null}
    </>
  );
};

export default Navbar;
