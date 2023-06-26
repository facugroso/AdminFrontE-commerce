import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Products() {
  const [products, setProducts] = useState();
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

  useEffect(() => {
    async function getProducts() {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products`,
      });
      setProducts(response.data);
    }
    getProducts();
  }, []);

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
        <h2>Products</h2>

        <div>
          <Link to="/products/add" className="btn btn-danger" role="button">
            Add Product
          </Link>
        </div>
      </div>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {products && categories ? (
            <>
              {products.map((item) => (
                <>
                  <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>
                      <>
                        {categories.map((category) => {
                          return (
                            <>
                              {item.categoryId === category.id && (
                                <>{category.name}</>
                              )}
                            </>
                          );
                        })}
                      </>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td>
                      <Link
                        to={`/products/${item.slug}`}
                        className="text-decoration-none"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                </>
              ))}
            </>
          ) : (
            <div>
              <h1>...Loading</h1>
            </div>
          )}
        </tbody>
      </table>
    </section>
  );
}
export default Products;
