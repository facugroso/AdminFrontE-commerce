import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditAdmin() {
  const user = useSelector((state) => state.user);
  const [admin, setAdmin] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAdmin() {
      const response = await axios({
        method: "get",
        url: `http://localhost:3000/admin/${params.id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setAdmin(response.data);
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setEmail(response.data.email);
      setPassword(response.data.password);
    }
    getAdmin();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await axios({
      method: "PATCH",
      url: `http://localhost:3000/admin/${params.id}`,
      data: {
        firstname,
        lastname,
        email,
        password,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    navigate("/users");
  }
  async function handleDelete(e) {
    e.preventDefault();

    const response = await axios({
      method: "DELETE",
      url: `http://localhost:3000/admin/${params.id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    navigate(-1);
  }

  return (
    <>
      {admin && (
        <div id="form_box" className="bg-dark mb-5">
          <div className="p-3 shadow-lg rounded">
            {" "}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="text-white">Edit Admin</h2>
              </div>
              <div>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete Admin
                </button>
              </div>
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
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditAdmin;
