import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState();
  const [admins, setAdmins] = useState();
  const [showUsers, setShowUsers] = useState("");
  const [showAdmins, setShowAdmins] = useState("none");

  useEffect(() => {
    async function getUserData() {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/users`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUserData(response.data);
    }
    getUserData();
  }, []);

  useEffect(() => {
    async function getAdmins() {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setAdmins(response.data);
    }
    getAdmins();
  }, []);

  const handleShowUsers = (e) => {
    e.preventDefault();
    setShowUsers("");
    setShowAdmins("none");
    navigate("/users");
  };

  const handleShowAdmins = (e) => {
    e.preventDefault();
    setShowUsers("none");
    setShowAdmins("");
    navigate("/admin");
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {userData && admins && (
        <section className="container-fluid w-100 px-4">
          <div className="d-flex justify-content-between">
            <h2>
              {showUsers ? (
                <>
                  <span onClick={handleShowUsers} style={{ cursor: "pointer" }}>
                    Users
                  </span>{" "}
                  /{" "}
                  <span
                    className="border-bottom border-danger border-5"
                    onClick={handleShowAdmins}
                  >
                    Admins
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="border-bottom border-danger border-5"
                    onClick={handleShowUsers}
                  >
                    Users
                  </span>{" "}
                  /{" "}
                  <span
                    onClick={handleShowAdmins}
                    style={{ cursor: "pointer" }}
                  >
                    Admins
                  </span>
                </>
              )}
            </h2>
            <div>
              <Link
                to="/admin/add-admin"
                className="btn btn-danger me-2"
                role="button"
              >
                Add Admin
              </Link>
            </div>
          </div>
          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {userData.map((userInfo) => (
                <>
                  <tr style={{ display: `${showUsers}` }}>
                    <th scope="row">{userInfo.id}</th>

                    <td>
                      {userInfo.firstname} {userInfo.lastname}
                    </td>
                    <td>{userInfo.email}</td>
                    <td>
                      <Link
                        to={`/user/${userInfo.id}`}
                        className="text-decoration-none"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                </>
              ))}
              {admins.map((admin) => (
                <>
                  <tr style={{ display: `${showAdmins}` }}>
                    <th scope="row">{admin.id}</th>

                    <td>
                      {admin.firstname} {admin.lastname}
                    </td>
                    <td>{admin.email}</td>
                    <td>
                      <Link
                        to={`/admin/${admin.id}`}
                        className="text-decoration-none"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
export default Users;
