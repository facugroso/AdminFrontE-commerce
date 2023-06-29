import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

function ViewOrders() {
  const navigate = useNavigate();
  const params = useParams();

  const user = useSelector((state) => state.user);

  const [order, setOrder] = useState();

  const statusColors = {
    Pending: "#737272",
    Paid: "#0d6efd",
    Sent: "#ecc94b",
    Delivered: "#198754",
  };

  useEffect(() => {
    async function fetchData() {
      const orderResponse = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_URL}/orders/${params.id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(orderResponse.data);
      setOrder(orderResponse.data);
    }
    fetchData();
  }, []);

  return (
    <>
      {order && (
        <section className="container-fluid w-50 px-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Order #{order.id}</h2>
            </div>
            <div>
              <button className="btn btn-dark" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
          <div className="p-3 mt-3 bg-white border">
            <div className="row pb-2 border-bottom">
              <div className="col-4">
                <strong>Order Id</strong>
              </div>
              <div className="col-6">
                <span>{order.id}</span>
              </div>
            </div>
            <div className="row py-2 border-bottom">
              <div className="col-4">
                <strong>User Name</strong>
              </div>
              <div className="col-6">
                <span>
                  {order.user.firstname} {order.user.lastname}
                </span>
              </div>
            </div>
            <div className="row py-2 border-bottom">
              <div className="col-4">
                <strong>Recipient's Name</strong>
              </div>
              <div className="col-6">
                <span>
                  {order.firstname} {order.lastname}
                </span>
              </div>
            </div>
            <div className="row py-2 border-bottom">
              <div className="col-4">
                <strong>Address</strong>
              </div>
              <div className="col-6">
                <span>{order.address}</span>
              </div>
            </div>
            <div className="row py-2 border-bottom">
              <div className="col-4">
                <strong>Phone</strong>
              </div>
              <div className="col-6">
                <span>{order.phone}</span>
              </div>
            </div>
            <div className="row py-2 border-bottom">
              <div className="col-4">
                <strong>Payment</strong>
              </div>
              <div className="col-6">
                <span>{order.payment}</span>
              </div>
            </div>
            <div className="row py-2 border-bottom">
              <div className="col-4">
                <strong>Products</strong>
              </div>
              <div className="col-6">
                <ul className="ps-0 m-0">
                  <>
                    {order.products.map((product) => (
                      <>
                        <li className="mb-1" style={{ listStyleType: "none" }}>
                          {product.name} - ${product.price} {"("}
                          {product.quantity}
                          {")"}
                        </li>
                      </>
                    ))}
                  </>
                </ul>
              </div>
            </div>
            <div className="row py-2 border-bottom">
              <div className="col-4">
                <strong>Total Price</strong>
              </div>
              <div className="col-6">
                <span>
                  $
                  {order.products
                    .reduce(
                      (total, product) =>
                        total +
                        parseFloat(
                          (product.price * product.quantity).toFixed(2)
                        ),
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-4">
                <strong>Status</strong>
              </div>
              <div
                className="col-6"
                style={{ color: statusColors[order.status] }}
              >
                <span>
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
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ViewOrders;
