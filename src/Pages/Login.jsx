import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import Logo from "../assets/icons/logo.svg";

import "./Login.css";

function Login() {
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  async function forgotPassword() {
    toast.warn("This feature is still under developement", {
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

  async function handleLogin(event) {
    event.preventDefault();

    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/tokenAdmin`,
      data: {
        email: emailValue,
        password: passwordValue,
      },
    });
    const token = response.data.token;
    if (token) {
      dispatch(setToken(response.data));
      navigate("/");
    } else {
      console.log("nope");
      navigate("/login");
    }
  }
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
      <div id="login_box" className="bg-dark">
        <img src={Logo} className="d-block pt-3" alt="Logo" />

        <div className="p-3 shadow-lg rounded">
          <div>
            <h2 className="text-white">Admin Panel Sign In</h2>
          </div>

          <form method="POST" onSubmit={handleLogin} className="mt-4">
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-sm bg-light mb-2"
                placeholder="Email"
                name="email"
                value={emailValue}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control form-control-sm bg-light"
                placeholder="Password"
                name="password"
                value={passwordValue}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="mt-4 mb-3 text-center">
              <button
                type="submit"
                className="btn btn-sm btn-light col"
                style={{ width: "40%" }}
              >
                Login
              </button>
            </div>

            <div className="text-center mt-2">
              <Link to="#" className="text-danger" onClick={forgotPassword}>
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div
        id="credentials"
        className="bg-dark text-white p-4 shadow-sm"
        transition-style="in:square:bottom-left"
      >
        <h5>Credentials</h5>
        <span className="d-block">Email: admin@admin </span>
        <span className="d-block">Password: 1234</span>
      </div>
    </>
  );
}

export default Login;
