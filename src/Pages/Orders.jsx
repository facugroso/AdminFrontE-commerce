import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

function Orders() {
  const user = useSelector((state) => state.user);

  const [orders, setOrders] = useState();

  useEffect(() => {
    async function setOrders() {
      const response = await axios({
        method: "get",
        url: `http://localhost:3000/orders`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setOrders(response.data);
    }
    setOrders();
  }, []);
  return (
    <section className="container w-100">
      <h2>Orders</h2>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">User</th>
            <th scope="col">Total Price</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              <strong> Mark Otto</strong> {"("}markotto@email.com{")"}
            </td>
            <td>$620</td>
            <td style={{ color: "#737272" }}>
              <i className="bi bi-clock"></i> Pending
            </td>{" "}
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>
              <strong>Jacob Thornton</strong> {"("}jacobthornton@email.com{")"}
            </td>
            <td>$110</td>
            <td style={{ color: "#0d6efd" }}>
              <i className="bi bi-check"></i> Paid
            </td>{" "}
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>
              <strong>Larry the Bird</strong> {"("}larrythebird@email.com{")"}
            </td>
            <td>$1200</td>
            <td style={{ color: "#198754" }}>
              <i className="bi bi-check"></i> Delivered
            </td>{" "}
          </tr>
        </tbody>
      </table>
    </section>
  );
}
export default Orders;
