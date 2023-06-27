import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState();
  const [show, setShow] = useState(false);

  const [category, setCategory] = useState("");
  const [categoryimg, setCategoryimg] = useState("");

  const [refresh, setRefresh] = useState(true);

  const user = useSelector((state) => state.user);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getCategories() {
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/categories`,
    });

    const categoriesData = response.data.map((category) => ({
      ...category,
      name: category.name.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()),
    }));

    setCategories(categoriesData);
  }

  useEffect(() => {
    getCategories();
  }, [refresh]);

  async function handleSubmit() {
    const parseCategory = category.toUpperCase();

    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/categories`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        name: parseCategory,
        image: categoryimg,
      },
    });
    setCategory("");
    setCategoryimg("");
    getCategories();
    setRefresh((prev) => !prev);
    toast.success("Category created successfully!", {
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

  async function addCategoryButton(e) {
    e.preventDefault();

    if (!category || !categoryimg) {
      return toast.error(
        "Failed to create category, please complete all fields.",
        {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }

    handleSubmit();
    handleClose();
  }

  return (
    <section className="container-fluid w-100 px-4">
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
      <div className="d-flex justify-content-between">
        <h2>Categories</h2>

        <div>
          <Link onClick={handleShow} className="btn btn-danger" role="button">
            Add Category
          </Link>
        </div>
      </div>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              Id
            </th>
            <th scope="col" className="text-center">
              Category Name
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category) => (
              <>
                <tr>
                  <th scope="row" className="text-center">
                    {category.id}
                  </th>
                  <td className="text-center">{category.name}</td>
                  <td>
                    <Link
                      to={`/categories/${category.slug}`}
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="New Category"
                value={category}
                required
                onChange={(event) => setCategory(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Image</label>
              <input
                className="form-control-file"
                type="file"
                placeholder="Image path"
                style={{ width: "100%" }}
                required
                onChange={(event) => setCategoryimg(event.target.files[0])}
              />
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="danger"
                type="submit"
                onClick={addCategoryButton}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default Categories;
