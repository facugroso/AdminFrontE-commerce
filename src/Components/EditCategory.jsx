import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditCategory() {
  const navigate = useNavigate();
  const params = useParams();

  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryimg, setCategoryimg] = useState("");

  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function getCategory() {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/categories/${
          params.slug
        }`,
      });
      setCategory(response.data);
      setCategoryName(response.data.name);
    }
    getCategory();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/categories/${
        category.id
      }`,
      data: {
        name: categoryName,
        image: categoryimg,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    });
    setCategoryName("");
    setCategoryimg("");
    navigate(-1);
  }

  async function handleDelete(e) {
    e.preventDefault();

    const response = await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/categories/${
        category.id
      }`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    navigate(-1);
  }

  return (
    <>
      {" "}
      {category && (
        <section className="container-fluid w-100 px-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Edit Category</h2>
            </div>
            <div>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Category
              </button>
            </div>
          </div>
          <div className="p-3 mt-3 bg-white border">
            <form method="POST" onSubmit={handleSubmit} className="mt-4">
              <div className="row form-group mb-3">
                <label className="col-4" htmlFor="categoryName">
                  Category Name
                </label>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control form-control-sm mb-2"
                    name="categoryName"
                    value={categoryName}
                    onChange={(event) => setCategoryName(event.target.value)}
                  />
                </div>
              </div>

              <div className="row form-group mb-3">
                <label htmlFor="categoryimage" className="col-4 form-label">
                  Category Image
                </label>
                <div className="col-4">
                  <input
                    className="form-control"
                    type="file"
                    name="categoryimage"
                    id="categoryimage"
                    onChange={(event) => setCategoryimg(event.target.files[0])}
                  />
                </div>
              </div>

              <div className="mt-4 mb-3 text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-light col px-3 me-2"
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

export default EditCategory;
