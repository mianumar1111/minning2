import axios from "axios";
import scoreIcon from "./images/scoreIcon.gif";
// import CoinImage from "./images/Coin.png";
import "./Welcome.css";
import { useEffect, useState } from "react";


const Welcome = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const LogedinUser = user;
  const email = LogedinUser.email;
  var oldScore = LogedinUser.score;
  const [score, setScore] = useState(oldScore);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${email}`);
        if (response.data) {
          setScore(response.data.score);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [email]);

  return (
    <>
      <div className="outercontainer">
        <div className="container">
          <h1 className="welcomeHeading">
            Hello <span className="name"> {LogedinUser.name}</span>
          </h1>
        </div>
        <div>
          <h1>
            <img src={scoreIcon} alt="Score Icon" /> {score}
          </h1>
        </div>
        {/* <button className="minBtn">Start Minning</button> */}
      </div>
    </>
  );
};

export default Welcome;
