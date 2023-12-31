import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./AddProduct.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        url: `${import.meta.env.VITE_API_URL}/products/${params.slug}`,
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
        url: `${import.meta.env.VITE_API_URL}/categories`,
      });
      setCategories(response.data);
    }
    getCategories();
  }, []);

  async function handleClick() {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_API_URL}/products/${params.slug}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success("Product deleted successfully!", {
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
      toast.error("Failed to delete product!", {
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

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      formData.append("categoryId", categoryId.toString());
      formData.append("trending", trending);
      const response = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/products/${params.slug}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success("Product edited successfully!", {
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
      toast.error("Failed to edit Product!", {
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
      {product && (
        <section className="container-fluid w-50 px-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Edit Product</h2>
            </div>
            <div>
              <button onClick={handleClick} className="btn btn-danger">
                Delete Product
              </button>
            </div>
          </div>
          <div className="p-3 my-3 bg-white border">
            <form method="POST" onSubmit={handleSubmit} className="mt-4">
              <div className=" form-group mb-3">
                <label htmlFor="name">Product Name</label>
                <input
                  required
                  id="name"
                  type="text"
                  className="form-control form-control-sm mb-2"
                  name="name"
                  value={productName}
                  onChange={(event) => setProductname(event.target.value)}
                />
              </div>

              <div className=" form-group mb-3">
                <label htmlFor="descriptionTitle">Description Title</label>
                <input
                  required
                  id="descriptionTitle"
                  type="text"
                  className="col-4 form-control form-control-sm"
                  name="descriptionTitle"
                  value={descriptionTitle}
                  onChange={(event) =>
                    setShortDescriptionTitle(event.target.value)
                  }
                />
              </div>

              <div className=" form-group mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  required
                  id="description"
                  type="text"
                  className="form-control form-control-sm "
                  style={{ height: "150px" }}
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>

              <div className="  form-group mb-3">
                <label htmlFor="features">Features</label>
                <input
                  required
                  id="features"
                  type="text"
                  className="form-control form-control-sm"
                  name="features"
                  value={features}
                  onChange={(event) => setFeatures(event.target.value)}
                />
              </div>
              <div className="row">
                <div className="col-6 form-group mb-3">
                  <label htmlFor="stock">Stock</label>
                  <input
                    required
                    id="stock"
                    type="number"
                    className="form-control form-control-sm"
                    name="stock"
                    value={stock}
                    onChange={(event) => setStock(event.target.value)}
                  />
                </div>

                <div className="col-6 form-group mb-3">
                  <label htmlFor="price">Unit Price</label>
                  <input
                    required
                    id="price"
                    type="number"
                    className="form-control form-control-sm"
                    name="price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>
              </div>
              <div className="input-group mb-3 d-flex flex-column">
                <div>
                  <label htmlFor="categoryId">Category</label>

                  <div>
                    <select
                      required
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
                              <option value={category.id}>
                                {category.name}
                              </option>
                            </>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group mb-3">
                <div>
                  <label htmlFor="image" className="form-label">
                    Main image
                  </label>
                  <div>
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
                </div>
                <img
                  className="mb-3 d-block"
                  style={{ margin: "1rem auto" }}
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
              </div>

              <div className="form-group mb-3">
                <div>
                  <label htmlFor="gallery" className="form-label">
                    Gallery
                  </label>
                  <div>
                    <input
                      className="form-control"
                      type="file"
                      name="gallery"
                      id="gallery"
                      multiple
                      onChange={(event) => setGallery(event.target.files)}
                    />
                  </div>
                </div>
                <div className="row" style={{ margin: "1rem auto" }}>
                  {product.gallery.map((galleryImg) => (
                    <>
                      <div className="col-4 mb-3">
                        <img
                          style={{ width: "100%" }}
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
              </div>

              <div className=" input-group mb-3">
                <div>
                  <label htmlFor="trending">Trending</label>
                </div>
                <select
                  required
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
                  type="button"
                  className="btn btn-sm btn-dark col px-3 me-2"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-danger col mx-3"
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

export default EditProduct;
