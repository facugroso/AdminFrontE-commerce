import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar bg-white mb-5">
      <div className="container-fluid d-flex justify-content-between">
        <Link className="navbar-brand" to="#">
          Admin Panel
        </Link>
        <div>
          <i className="bi bi-person-circle" style={{ fontSize: "30px" }}></i>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
