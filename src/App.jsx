import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import Home from "./Pages/Home";
import Users from "./Pages/Users";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";

import "./App.css";

function App() {
  return (
    <>
      <div id="App" className="d-flex align-items-stretch">
        <SideBar />
        <div id="main">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
