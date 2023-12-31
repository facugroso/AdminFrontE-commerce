import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditUser() {
  const user = useSelector((state) => state.user);
  const [admin, setAdmin] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_URL}/users/${params.id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setAdmin(response.data);
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setPhone(response.data.phone);
    }
    getUser();
  }, []);

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const response = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/users/${params.id}`,
        data: {
          firstname,
          lastname,
          email,
          password,
          phone,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setAdmin(response.data);
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setPhone(response.data.phone);
      toast.success("User edited successfully!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      navigate("/users");
    } catch (error) {
      toast.error("Failed to edit user!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  async function handleDelete(e) {
    try {
      e.preventDefault();

      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_API_URL}/users/${params.id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success("User deleted successfully!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      navigate(-1);
    } catch (error) {
      toast.error("Failed to delete user!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  return (
    <>
      {admin && (
        <section className="container-fluid w-50 px-4">
          <div className="d-flex justify-content-between aling-item-center">
            <div>
              <h2>Edit User</h2>
            </div>
            <div>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete User
              </button>
            </div>
          </div>
          <div className="p-3 mt-3 bg-white border">
            <form method="POST" onSubmit={handleSubmit} className="mt-4">
              <div className=" form-group mb-3">
                <label htmlFor="firstname">Firstname</label>
                <input
                  required
                  type="text"
                  className="form-control form-control-sm bg-light mb-2"
                  name="firstname"
                  value={firstname}
                  onChange={(event) => setFirstname(event.target.value)}
                />
              </div>
              <div className=" form-group mb-3">
                <label htmlFor="lastname">Lastname</label>
                <input
                  required
                  type="text"
                  className="form-control form-control-sm bg-light mb-2"
                  name="lastname"
                  value={lastname}
                  onChange={(event) => setLastname(event.target.value)}
                />
              </div>
              <div className=" form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  className="form-control form-control-sm bg-light mb-2"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className=" form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  required
                  type="password"
                  className="form-control form-control-sm bg-light mb-2"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className=" form-group mb-3">
                <label htmlFor="phone">Phone</label>
                <input
                  required
                  type="text"
                  className="form-control form-control-sm bg-light mb-2"
                  name="passphoneword"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>

              <div className="mt-4 mb-3 text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-dark col px-3 me-2"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-danger col px-3"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default EditUser;
