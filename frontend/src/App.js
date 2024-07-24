import "./App.css";
import Signup from "./components/signupPage";
import Login from "./components/Login";
import Payment from "./components/Payment";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/welcome" element={<Navbar  />} />
          <Route path="/payment" element={<Payment  />} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
        {/* <>kjszgfzbjk</> */}
      </BrowserRouter>
    </div>
  );
}

export default App;