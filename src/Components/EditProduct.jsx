import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./AddProduct.css";
import axios from "axios";

function EditProduct() {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
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
    async function getProduct() {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/${
          params.slug
        }`,
      });
      setProduct(response.data);
      setProductname(response.data.name);
      setShortDescriptionTitle(response.data.descriptionTitle);
      setDescription(response.data.description);
      setStock(response.data.stock);
      setPrice(response.data.price);
      setCategoryId(response.data.categoryId);
      setTrending(response.data.trending);
      setImage(response.data.image);
      setGallery(response.data.gallery);
      setFeatures(response.data.features);
    }
    getProduct();
  }, []);

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

  async function handleClick(e) {
    const response = await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/${
        params.slug
      }`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    navigate("/products");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("categoryId", categoryId.toString());
    formData.append("trending", trending);
    const response = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/${
        params.slug
      }`,
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
      {product && (
        <div id="form_box" className="bg-dark mb-5">
          <div className="p-3 shadow-lg rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="text-white">Edit Product</h2>
              </div>
              <div>
                <button onClick={handleClick} className="btn btn-danger">
                  Delete Product
                </button>
              </div>
            </div>

            <form method="POST" onSubmit={handleSubmit} className="mt-4">
              <div className="form-group mb-3">
                <label className="text-white" htmlFor="name">
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control form-control-sm bg-light mb-2"
                  name="name"
                  value={productName} //product.name
                  onChange={(event) => setProductname(event.target.value)} // setProduct((prevState) => {...prevState, name: event.target.value})
                />
              </div>

              <div className="form-group mb-3">
                <label className="text-white" htmlFor="descriptionTitle">
                  Description Title
                </label>
                <input
                  id="descriptionTitle"
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
                  id="description"
                  type="text"
                  className="form-control form-control-sm bg-light"
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="text-white" htmlFor="features">
                  Features
                </label>
                <input
                  id="features"
                  type="text"
                  className="form-control form-control-sm bg-light"
                  name="features"
                  value={features}
                  onChange={(event) => setFeatures(event.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="text-white" htmlFor="stock">
                  Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  className="form-control form-control-sm bg-light"
                  name="stock"
                  value={stock}
                  onChange={(event) => setStock(event.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="text-white" htmlFor="price">
                  Unit Price
                </label>
                <input
                  id="price"
                  type="number"
                  className="form-control form-control-sm bg-light"
                  name="price"
                  value={price}
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

              <div className="form-group mb-3 d-flex flex-column">
                <label htmlFor="image" className="form-label text-white">
                  Main image
                </label>
                <img
                  className="mb-3"
                  width={200}
                  src={
                    product.image.includes("https")
                      ? product.image
                      : `${import.meta.env.VITE_IMAGE_CLOUD_DIRECTION}/${
                          product.image
                        }`
                  }
                  alt="Product image"
                />
                <input
                  className="form-control rounded-bottom"
                  type="file"
                  name="image"
                  id="image"
                  onChange={(event) => {
                    setImage(event.target.files[0]);
                  }}
                />
              </div>

              <div className="form-group mb-3 d-flex flex-column">
                <label htmlFor="gallery" className="form-label text-white">
                  Gallery
                </label>
                <div className="row">
                  {product.gallery.map((galleryImg) => (
                    <>
                      <div className="col-4 mb-3">
                        <img
                          width={200}
                          src={
                            galleryImg.includes("https")
                              ? galleryImg
                              : `${
                                  import.meta.env.VITE_IMAGE_CLOUD_DIRECTION
                                }/${galleryImg}`
                          }
                          alt=""
                        />
                      </div>
                    </>
                  ))}
                </div>
                <input
                  className="form-control"
                  type="file"
                  name="gallery"
                  id="gallery"
                  multiple
                  onChange={(event) => setGallery(event.target.files)}
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
