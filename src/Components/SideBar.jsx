import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import "./SideBar.css";
import Logo from "../assets/icons/logo.svg";

function SideBar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const isActivePath = (path) => {
    return location.pathname === path ? "active" : "";
  };

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <aside
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "280px", height: "100%" }}
    >
      <div className="position-fixed sidebar-style">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 justify-content-center text-white text-decoration-none"
        >
          <img
            src={Logo}
            alt="logo"
            style={{ width: "100px" }}
            className="d-inline-block"
          />
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column">
          <li className={isActivePath("/")}>
            <Link to="/" className="nav-link text-white">
              <i
                className="bi bi-house me-2"
                style={{ color: "#ffffff", fontSize: "20px" }}
              ></i>
              Dashboard
            </Link>
          </li>
          <li className={isActivePath("/users")}>
            <Link to="/users" className="nav-link text-white">
              <i
                className="bi bi-person me-2"
                style={{ color: "#ffffff", fontSize: "20px" }}
              ></i>
              Users
            </Link>
          </li>
          <li className={isActivePath("/products")}>
            <Link to="/products" className="nav-link text-white">
              <i
                className="bi bi-bag me-2"
                style={{ color: "#ffffff", fontSize: "20px" }}
              ></i>
              Products
            </Link>
          </li>
          <li className={isActivePath("/orders")}>
            <Link to="/orders" className="nav-link text-white">
              <i
                className="bi bi-cart4 me-2"
                style={{ color: "#ffffff", fontSize: "20px" }}
              ></i>
              Orders
            </Link>
          </li>
        </ul>
        <hr className="px-2 py-3" />
        <Link
          to="/login"
          className="nav-link text-white ps-3"
          onClick={handleLogout}
        >
          <i
            className="bi bi-box-arrow-right me-2"
            style={{ color: "#ffffff", fontSize: "20px" }}
          ></i>
          Sign Out
        </Link>
      </div>
    </aside>
  );
}

export default SideBar;
