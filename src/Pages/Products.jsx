import { Link } from "react-router-dom";

function Products() {
  return (
    <section className="container w-100">
      <div className="d-flex justify-content-between">
        <h2>Products</h2>
        <div>
          <Link to="/orders" className="btn btn-danger" role="button">
            Add Product
          </Link>
        </div>
      </div>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>HyperX Cloud III - Gaming Headset </td>
            <td>$99.99</td>
            <td>100</td>
            <td>
              <Link to="#" className="text-decoration-none">
                Edit
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
export default Products;
