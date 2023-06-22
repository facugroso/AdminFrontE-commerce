import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AddAdmin() {
  const admin = useSelector((state) => state.user);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/admin",
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
    navigate("/users");
  }

  return (
    <>
      <div id="form_box" className="bg-dark mb-5">
        <div className="p-3 shadow-lg rounded">
          <div>
            <h2 className="text-white">New Admin</h2>
          </div>

          <form method="POST" onSubmit={handleSubmit} className="mt-4">
            <div className="form-group mb-3">
              <label className="text-white" htmlFor="firstname">
                Firstname
              </label>
              <input
                type="text"
                className="form-control form-control-sm bg-light mb-2"
                name="firstname"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label className="text-white" htmlFor="lastname">
                Lastname
              </label>
              <input
                type="text"
                className="form-control form-control-sm bg-light mb-2"
                name="lastname"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label className="text-white" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-sm bg-light mb-2"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label className="text-white" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-sm bg-light mb-2"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="mt-4 mb-3 text-center">
              <button
                type="submit"
                className="btn btn-sm btn-light col"
                style={{ width: "40%" }}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddAdmin;