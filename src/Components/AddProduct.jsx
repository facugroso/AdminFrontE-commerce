import { useState } from "react";
import addProduct from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import "./AddProduct.css";
import axios from "axios";

function AddProduct() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [productName, setProductname] = useState("");
  const [descriptionTitle, setShortDescriptionTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/products",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        name: productName,
        descriptionTitle: descriptionTitle,
        description: description,
        stock: stock,
      },
    });
    dispatch(addProduct(response.data));
    setProductname("");
    setShortDescriptionTitle("");
    setDescription("");
    setStock("");
  }

  return (
    <>
      <div id="form_box" className="bg-dark">
        <div className="p-3 shadow-lg rounded">
          <div>
            <h2 className="text-white">New Product</h2>
          </div>

          <form method="POST" onSubmit={handleSubmit} className="mt-4">
            <div className="form-group mb-3">
              <label className="text-white" htmlFor="productName">
                Product Name
              </label>
              <input
                type="text"
                className="form-control form-control-sm bg-light mb-2"
                name="productName"
                value={productName}
                onChange={(event) => setProductname(event.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label className="text-white" htmlFor="descriptionTitle">
                Description Title
              </label>
              <input
                type="text"
                className="form-control form-control-sm bg-light"
                name="descriptionTitle"
                value={descriptionTitle}
                onChange={(event) =>
                  setShortDescriptionTitle(event.target.value)
                }
              />
            </div>

            <div className="form-group mb-3">
              <label className="text-white" htmlFor="description">
                Description
              </label>
              <textarea
                type="text"
                className="form-control form-control-sm bg-light"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label className="text-white" htmlFor="stock">
                Stock
              </label>
              <input
                type="number"
                className="form-control form-control-sm bg-light"
                name="stock"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
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

export default AddProduct;
