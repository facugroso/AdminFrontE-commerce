import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import Home from "./Pages/Home";
import Users from "./Pages/Users";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import AddProduct from "./Components/AddProduct";
import Categories from "./Pages/Categories";
import EditProduct from "./Components/EditProduct";
import EditCategory from "./Components/EditCategory";
import AddAdmin from "./Components/AddAdmin";

import "./App.css";

function App() {
  const location = useLocation();
  const hideComponents = ["/login"];
  const hideSidebarAndNavBar = !hideComponents.includes(location.pathname);

  return (
    <>
      <div id="App" className="d-flex align-items-stretch">
        {hideSidebarAndNavBar && <SideBar />}
        <main id="main">
          {hideSidebarAndNavBar && <NavBar />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/:slug" element={<EditProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:slug" element={<EditCategory />} />
            <Route path="/admin/add-admin" element={<AddAdmin />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
