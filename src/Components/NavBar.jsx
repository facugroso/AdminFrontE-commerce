import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const user = useSelector((state) => state.user.dataValues);

  console.log(user);

  return (
    <nav className="navbar bg-white mb-5">
      <div className="container-fluid d-flex justify-content-between">
        <Link className="navbar-brand" to="#">
          Admin Panel
        </Link>
        <div>
          <span>Welcome, {user.firstname}</span>
          <i
            className="bi bi-person-circle"
            style={{ fontSize: "30px", marginLeft: "0.5rem" }}
          ></i>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
