import { useState, useEffect } from "react";
import { addProduct } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./AddProduct.css";
import axios from "axios";

function EditProduct() {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState("");
  const [productName, setProductname] = useState("");
  const [descriptionTitle, setShortDescriptionTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [trending, setTrending] = useState("");
  const [features, setFeatures] = useState("");

  const navigate = useNavigate();

  const [categories, setCategories] = useState();

  useEffect(() => {
    async function getProduct() {
      const response = await axios({
        method: "get",
        url: `http://localhost:3000/products/${params.slug}`,
      });
      setProduct(response.data);
    }
    getProduct();
  }, []);

  useEffect(() => {
    async function getCategories() {
      const response = await axios({
        method: "get",
        url: `http://localhost:3000/categories`,
      });
      setCategories(response.data);
    }
    getCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("descriptionTitle", descriptionTitle);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("gallery", gallery);
    formData.append("categoryId", categoryId.toString());
    formData.append("trending", trending);
    formData.append("features", features);
    const response = await axios({
      method: "PATCH",
      url: `http://localhost:3000/products/${params.id}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch(addProduct(response.data));
    setProductname("");
    setShortDescriptionTitle("");
    setDescription("");
    setStock("");
    navigate("/products");
  }

  return (
    <>
      {product && (
        <div id="form_box" className="bg-dark mb-5">
          <div className="p-3 shadow-lg rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="text-white">Edit Product</h2>
              </div>
              <div>
                <button className="btn btn-danger">Delete Product</button>
              </div>
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
                  value={product.name}
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
                  value={product.descriptionTitle}
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
                  value={product.description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="text-white" htmlFor="features">
                  Features
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm bg-light"
                  name="features"
                  value={product.features}
                  onChange={(event) => setFeatures(event.target.value)}
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
                  value={product.stock}
                  onChange={(event) => setStock(event.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="text-white" htmlFor="price">
                  Unit Price
                </label>
                <input
                  type="number"
                  className="form-control form-control-sm bg-light"
                  name="price"
                  value={product.price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>

              <div className="input-group mb-3 d-flex flex-column">
                <div>
                  <label className="text-white" htmlFor="categoryId">
                    Category
                  </label>
                </div>
                <select
                  className="form-select w-100 rounded"
                  id="categoryId"
                  aria-label="Example select with button addon"
                  onChange={(event) => setCategoryId(event.target.value)}
                >
                  {categories && (
                    <>
                      {categories.map((category) => (
                        <>
                          {category.id === product.categoryId && (
                            <option value={category.id} disabled selected>
                              <>{category.name}</>
                            </option>
                          )}
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
                  name="gallery"
                  id="gallery"
                  onChange={(event) => setGallery(event.target.files[0])}
                />
              </div>

              <div className="input-group mb-3 d-flex flex-column">
                <div>
                  <label className="text-white" htmlFor="trending">
                    Trending
                  </label>
                </div>
                <select
                  className="form-select w-100 rounded"
                  id="trending"
                  aria-label="Example select with button addon"
                  onChange={(event) => setTrending(event.target.value)}
                >
                  {product.trending === 0 ? (
                    <>
                      <option value={product.trending} disabled selected>
                        No
                      </option>
                    </>
                  ) : (
                    <>
                      <option value={product.trending} disabled selected>
                        Yes
                      </option>
                    </>
                  )}
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
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

export default EditProduct;
