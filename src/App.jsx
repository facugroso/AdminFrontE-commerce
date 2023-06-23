import "./App.css";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
import EditAdmin from "./Components/EditAdmin";
import EditUser from "./Components/EditUser";

import "./App.css";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const location = useLocation();
  const hideComponents = ["/login"];
  const hideSidebarAndNavBar = !hideComponents.includes(location.pathname);

  const user = useSelector((state) => state.user);

  return (
    <>
      <div id="App" className="d-flex align-items-stretch">
        {hideSidebarAndNavBar && <SideBar />}
        <main id="main">
          {hideSidebarAndNavBar && <NavBar />}
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute user={user}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute user={user}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute user={user}>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/add"
              element={
                <ProtectedRoute user={user}>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/:slug"
              element={
                <ProtectedRoute user={user}>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute user={user}>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute user={user}>
                  <Categories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories/:slug"
              element={
                <ProtectedRoute user={user}>
                  <EditCategory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-admin"
              element={
                <ProtectedRoute user={user}>
                  <AddAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/:id"
              element={
                <ProtectedRoute user={user}>
                  <EditAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:id"
              element={
                <ProtectedRoute user={user}>
                  <EditUser />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
