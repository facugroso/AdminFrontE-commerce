import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddAdmin() {
  const admin = useSelector((state) => state.user);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin`,
        data: {
          firstname,
          lastname,
          email,
          password,
        },
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");

      toast.success("Admin created successfully!", {
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
      toast.error("Failed to create admin!", {
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
      <section className="container-fluid w-50 px-4">
        <div className="d-flex justify-content-between aling-item-center">
          <div>
            <h2>New Admin</h2>
          </div>
          <div>
            <button className="btn btn-dark" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>

        <div className="p-3 mt-3 bg-white border">
          <form method="POST" onSubmit={handleSubmit} className="mt-4">
            <div className="form-group mb-3">
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                className="form-control form-control-sm mb-2"
                name="firstname"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                className="form-control form-control-sm mb-2"
                name="lastname"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control form-control-sm mb-2"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control form-control-sm mb-2"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
              <button type="submit" className="btn btn-sm btn-danger col px-3">
                Create
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddAdmin;
