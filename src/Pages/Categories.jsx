import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../redux/categorySlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState();
  const [show, setShow] = useState(false);

  const [category, setCategory] = useState("");
  const [categoryimg, setCategoryimg] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getCategories() {
    console.log("boop");
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/categories`,
    });

    const categoriesData = response.data.map((category) => ({
      ...category,
      name: category.name.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()),
    }));

    setCategories(categoriesData);
  }

  useEffect(() => {
    getCategories();
  }, []);

  async function handleSubmit() {
    const parseCategory = category.toUpperCase();

    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/category",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        name: parseCategory,
        image: categoryimg,
      },
    });
    console.log(response.data);
    dispatch(addCategory(response.data));
    setCategory("");
    setCategoryimg("");
    getCategories();
  }

  async function addCategoryButton(e) {
    e.preventDefault();
    handleSubmit();
    handleClose();
  }

  return (
    <section className="container w-100">
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
                    <Link to="#" className="text-decoration-none">
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
          <Form method="POST" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="categoryname">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="New Category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="Image path"
                onChange={(event) => setCategoryimg(event.target.files[0])}
              />
            </Form.Group>
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
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default Categories;
