import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

import "./Home.css";

function Home() {
  const user = useSelector((state) => state.user);

  const [orders, setOrders] = useState();
  const [userData, setUserData] = useState();
  const [totalEarnings, setTotalEarnings] = useState();
  const [totalOrders, setTotalOrders] = useState();

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

      const ordersPreview = [...ordersResponse.data];
      setTotalOrders(ordersPreview);
      setTotalEarnings(
        ordersPreview.reduce((total, order) => {
          const orderTotal = order.products.reduce(
            (subtotal, product) => subtotal + product.price * product.quantity,
            0
          );
          return total + orderTotal;
        }, 0)
      );

      const sortedOrders = ordersPreview.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
      const lastFiveOrders = sortedOrders.reverse().slice(0, 5);
      setOrders(lastFiveOrders);
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
      {orders && userData && (
        <>
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
                  <h3>{totalOrders.length}</h3>
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
                  <h3>${totalEarnings}</h3>
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
                  <h3>{userData.length}</h3>
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
                {orders.map((order) => (
                  <>
                    <tr>
                      <td>
                        {userData.map((buyer) => {
                          return (
                            <>
                              {buyer.id === order.userId && (
                                <>
                                  {buyer.firstname} {buyer.lastname}
                                </>
                              )}
                            </>
                          );
                        })}
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
          </div>
        </>
      )}
    </section>
  );
}

export default Home;
