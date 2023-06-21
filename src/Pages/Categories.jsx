import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState();
  const [show, setShow] = useState(false);

  const user = useSelector((state) => state.user);
  const [category, setCategory] = useState("");
  const [categoryimg, setCategoryimg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/category",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        name: category,
        image: categoryimg,
      },
    });
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function getCategories() {
      const response = await axios({
        method: "get",
        url: `http://localhost:3000/categories`,
      });

      const categoriesData = response.data.map((category) => ({
        ...category,
        name: category.name
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase()),
      }));

      setCategories(categoriesData);
      console.log(response.data);
    }
    getCategories();
  }, []);

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
          <Form>
            <Form.Group className="mb-3" controlId="categoryname">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="New Category" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" placeholder="Image path" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default Categories;
