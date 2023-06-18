import { Link } from "react-router-dom";

function Users() {
  return (
    <section className="container w-100">
      <div className="d-flex justify-content-between">
        <h2>Users</h2>
        <div>
          <Link to="/orders" className="btn btn-danger" role="button">
            Add Users
          </Link>
        </div>
      </div>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Avatar</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Admin</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "30px" }}
              ></i>
            </td>
            <td>Mark Otto</td>
            <td>markotto@email.com</td>
            <td>
              <i
                className="bi bi-check-circle"
                style={{ color: "#198754" }}
              ></i>
            </td>
            <td>
              <Link to="#" className="text-decoration-none">
                Edit
              </Link>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "30px" }}
              ></i>
            </td>
            <td>Jacob Thornton</td>
            <td>jacobthornton@email.com</td>
            <td>
              <i className="bi bi-x-circle " style={{ color: "#dc3545" }}></i>
            </td>
            <td>
              <Link to="#" className="text-decoration-none">
                Edit
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
export default Users;
