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
        url: `http://localhost:3000/orders`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("Orders Response:", ordersResponse.data);

      const usersResponse = await axios({
        method: "get",
        url: `http://localhost:3000/users`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("Users Response:", usersResponse.data);
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

  return (
    <section className="container w-100">
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
          </tr>
        </thead>
        <tbody>
          {orders &&
            userData &&
            orders.map((order) => (
              <>
                <tr>
                  <th scope="row">{order.id}</th>
                  <td>
                    <>
                      {userData.map((buyer) => {
                        return (
                          <>
                            {buyer.id === order.userId && (
                              <>
                                <strong>
                                  {" "}
                                  {buyer.firstname} {buyer.lastname}
                                </strong>
                                {" ("}
                                {buyer.email}
                                {")"}
                              </>
                            )}
                          </>
                        );
                      })}
                    </>
                  </td>
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
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </section>
  );
}
export default Orders;
