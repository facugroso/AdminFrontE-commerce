import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  return (
    <section className="container w-100">
      <div id="stats" className="row gx-5">
        <div className="col-3">
          <div
            id="col_content"
            className="d-flex justify-content-between px-3 py-4"
          >
            <div>
              <h3>1,042</h3>
              <span>Daily Views</span>
            </div>
            <i className="bi bi-eye"></i>
          </div>
        </div>
        <div className="col-3">
          <div
            id="col_content"
            className="d-flex justify-content-between px-3 py-4"
          >
            <div>
              <h3>80</h3>
              <span>Orders</span>
            </div>
            <i className="bi bi-cart-fill"></i>
          </div>
        </div>
        <div className="col-3">
          <div
            id="col_content"
            className="d-flex justify-content-between px-3 py-4"
          >
            <div>
              <h3>$6,042</h3>
              <span>Earnings</span>
            </div>
            <i className="bi bi-currency-dollar"></i>
          </div>
        </div>
        <div className="col-3">
          <div
            id="col_content"
            className="d-flex justify-content-between px-3 py-4"
          >
            <div>
              <h3>200</h3>
              <span>Users</span>
            </div>
            <i className="bi bi-person-fill"></i>
          </div>
        </div>
      </div>
      <div className="my-5 bg-white py-4 px-5">
        <div className="d-flex justify-content-between">
          <h2>Recent Orders</h2>
          <div>
            <Link to="/orders" className="btn btn-danger" role="button">
              View All
            </Link>
          </div>
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Total Price</th>
              <th scope="col">Order Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark Otto</td>
              <td>$620</td>
              <td style={{ color: "#737272" }}>
                <i className="bi bi-clock"></i> Pending
              </td>
            </tr>
            <tr>
              <td>Jacob Thornton</td>
              <td>$110</td>
              <td style={{ color: "#0d6efd" }}>
                <i className="bi bi-check"></i> Paid
              </td>
            </tr>
            <tr>
              <td>Larry the Bird</td>
              <td>$1200</td>
              <td style={{ color: "#198754" }}>
                <i className="bi bi-check"></i> Delivered
              </td>
            </tr>
            <tr>
              <td>John Doe</td>
              <td>$540</td>
              <td style={{ color: "#ecc94b" }}>
                <i className="bi bi-box-arrow-up"></i> Sent
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Home;
