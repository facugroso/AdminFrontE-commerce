import { useNavigate } from "react-router-dom";

function Err404() {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-center mt-4">
        <h1 style={{ fontSize: "5rem", color: "#e01637" }}>404</h1>
        <h2 style={{ color: "#e01637" }}>
          Page not found <i className="bi bi-emoji-frown"></i>
        </h2>
        <p>Sorry, the page you requested could not be found.</p>
        <button className="btn btn-dark" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </>
  );
}

export default Err404;
