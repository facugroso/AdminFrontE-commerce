import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import Home from "./Pages/Home";
import Users from "./Pages/Users";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";

import "./App.css";

function App() {
  const hideSidebarAndNavBar = window.location.pathname === "/login";

  useEffect(() => {}, []);

  return (
    <>
      <div id="App" className="d-flex align-items-stretch">
        {!hideSidebarAndNavBar && <SideBar />}
        <main id="main">
          {!hideSidebarAndNavBar && <NavBar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
