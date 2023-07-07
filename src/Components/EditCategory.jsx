import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        url: `${import.meta.env.VITE_API_URL}/categories/${params.slug}`,
      });
      setCategory(response.data);
      setCategoryName(response.data.name);
    }
    getCategory();
  }, []);

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const response = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/categories/${category.id}`,
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
      toast.success("Category edited successfully!", {
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
      toast.error("Failed to edit category!", {
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
        url: `${import.meta.env.VITE_API_URL}/categories/${category.id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      toast.success("Category deteled successfully!", {
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
      toast.error("Failed to delete category!", {
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
      {" "}
      {category && (
        <section className="container-fluid w-50 px-4">
          {console.log(category)}
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
              <div className="form-group mb-3">
                <label htmlFor="categoryName">Category Name</label>
                <input
                  required
                  type="text"
                  className="form-control form-control-sm mb-2"
                  name="categoryName"
                  value={categoryName}
                  onChange={(event) => setCategoryName(event.target.value)}
                />
              </div>

              <div className=" form-group mb-3">
                <label htmlFor="categoryimage" className="col-4 form-label">
                  Category Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="categoryimage"
                  id="categoryimage"
                  onChange={(event) => setCategoryimg(event.target.files[0])}
                />
                <div className="d-flex justify-content-center">
                  <img
                    style={{ width: "60%" }}
                    src={`${import.meta.env.VITE_IMAGE_CLOUD_DIRECTION}/${
                      category.image
                    }`}
                    alt={`${category.name} image`}
                  />
                </div>
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

export default EditCategory;
