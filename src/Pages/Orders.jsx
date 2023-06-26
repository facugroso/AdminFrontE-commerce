import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

function Orders() {
  const user = useSelector((state) => state.user);

  const [orders, setOrders] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function fetchData() {
      const ordersResponse = await axios({
        method: "get",
        url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/orders`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const usersResponse = await axios({
        method: "get",
        url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/users`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(ordersResponse.data);
      setUserData(usersResponse.data);
    }
    fetchData();
  }, []);

  const statusColors = {
    Pending: "#737272",
    Paid: "#0d6efd",
    Sent: "#ecc94b",
    Delivered: "#198754",
  };

  const getOrderUserName = (order) => {
    if (order.userId !== null) {
      const user = userData.find((buyer) => buyer.id === order.userId);
      if (user) {
        return (
          <>
            <span className="fw-bold">
              {user.firstname} {user.lastname}
            </span>{" "}
            ({user.email})
          </>
        );
      }
    }
    return (
      <span className="fw-bold">
        {order.firstname} {order.lastname}
      </span>
    );
  };

  return (
    <section className="container-fluid w-100 px-4">
      <h2>Orders</h2>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col" style={{ width: "45%" }}>
              User
            </th>
            <th scope="col">Total Price</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            userData &&
            orders.map((order) => (
              <tr key={order.id}>
                <>
                  <th scope="row">{order.id}</th>
                  <td>{getOrderUserName(order)}</td>
                  <td>
                    $
                    {order.products.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )}
                  </td>
                  <td style={{ color: statusColors[order.status] }}>
                    {order.status === "Pending" ? (
                      <i className="bi bi-clock"></i>
                    ) : order.status === "Paid" ? (
                      <i className="bi bi-check"></i>
                    ) : order.status === "Sent" ? (
                      <i className="bi bi-box-arrow-up"></i>
                    ) : order.status === "Delivered" ? (
                      <i className="bi bi-check"></i>
                    ) : (
                      " "
                    )}{" "}
                    {order.status}
                  </td>
                  <td>
                    <Link
                      to={`/orders/${order.id}`}
                      className="text-decoration-none"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </section>
  );
}
export default Orders;
