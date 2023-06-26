import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import axios from "axios";

function AddProduct() {
  const user = useSelector((state) => state.user);
  const [productName, setProductname] = useState("");
  const [descriptionTitle, setShortDescriptionTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [trending, setTrending] = useState("");
  const [features, setFeatures] = useState("");

  const navigate = useNavigate();

  const [categories, setCategories] = useState();

  useEffect(() => {
    async function getCategories() {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/categories`,
      });
      setCategories(response.data);
    }
    getCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("categoryId", categoryId.toString());
    formData.append("trending", trending);
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    });
    navigate("/products");
  }

  return (
    <>
      <section className="container-fluid w-50 px-4 mb-3">
        <div className="d-flex justify-content-between aling-item-center">
          <div>
            <h2>New Product</h2>
          </div>
          <div>
            <button className="btn btn-dark" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>

        <div className="p-3 mt-3 bg-white border">
          <form method="POST" onSubmit={handleSubmit} className="mt-4">
            <div className="form-group mb-3">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                type="text"
                className="form-control form-control-sm  mb-2"
                name="name"
                value={productName}
                onChange={(event) => setProductname(event.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="descriptionTitle">Description Title</label>
              <input
                type="text"
                className="form-control form-control-sm "
                name="descriptionTitle"
                value={descriptionTitle}
                onChange={(event) =>
                  setShortDescriptionTitle(event.target.value)
                }
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                className="form-control form-control-sm "
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="features">Features</label>
              <input
                type="text"
                className="form-control form-control-sm "
                name="features"
                value={features}
                onChange={(event) => setFeatures(event.target.value)}
              />
            </div>
            <div className="row">
              <div className="col-6 form-group mb-3">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  className="form-control form-control-sm "
                  name="stock"
                  value={stock}
                  onChange={(event) => setStock(event.target.value)}
                />
              </div>

              <div className="col-6 form-group mb-3">
                <label htmlFor="price">Unit Price</label>
                <input
                  type="number"
                  className="form-control form-control-sm "
                  name="price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>
            </div>
            <div className="input-group mb-3 d-flex flex-column">
              <div>
                <label htmlFor="categoryId">Category</label>
              </div>
              <select
                className="form-select w-100 rounded"
                id="categoryId"
                aria-label="Example select with button addon"
                onChange={(event) => setCategoryId(event.target.value)}
              >
                <option disabled selected>
                  Select a category
                </option>
                {categories && (
                  <>
                    {categories.map((category) => (
                      <>
                        <option value={category.id}>{category.name}</option>
                      </>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="image" className="form-label text-white">
                Main image
              </label>
              <input
                className="form-control"
                type="file"
                name="image"
                id="image"
                onChange={(event) => setImage(event.target.files[0])}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="gallery" className="form-label text-white">
                Gallery
              </label>
              <input
                className="form-control"
                type="file"
                multiple
                name="gallery"
                id="gallery"
                onChange={(event) => setGallery(event.target.files)}
              />
            </div>

            <div className="input-group mb-3 d-flex flex-column">
              <div>
                <label htmlFor="trending">Trending</label>
              </div>
              <select
                className="form-select w-100 rounded"
                id="trending"
                aria-label="Example select with button addon"
                onChange={(event) => setTrending(event.target.value)}
              >
                <option disabled selected>
                  Trending item
                </option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="mt-4 mb-3 text-center">
              <button
                type="button"
                className="btn btn-sm btn-dark col px-3 me-2"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-sm btn-danger col px-3">
                Create
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddProduct;
