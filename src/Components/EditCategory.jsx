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
        <div id="form_box" className="bg-dark mb-5">
          <div className="p-3 shadow-lg rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="text-white">Edit Category</h2>
              </div>
              <div>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete Category
                </button>
              </div>
            </div>

            <form method="POST" onSubmit={handleSubmit} className="mt-4">
              <div className="form-group mb-3">
                <label className="text-white" htmlFor="categoryName">
                  Category Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm bg-light mb-2"
                  name="categoryName"
                  value={categoryName}
                  onChange={(event) => setCategoryName(event.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label
                  htmlFor="categoryimage"
                  className="form-label text-white"
                >
                  Category Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="categoryimage"
                  id="categoryimage"
                  onChange={(event) => setCategoryimg(event.target.files[0])}
                />
              </div>

              <div className="mt-4 mb-3 text-center">
                <button
                  type="submit"
                  className="btn btn-sm btn-light col"
                  style={{ width: "40%" }}
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditCategory;
