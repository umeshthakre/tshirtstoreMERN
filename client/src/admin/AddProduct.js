import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategories, createProduct } from "./helper/adminapicall";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = () => {
    getCategories().then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-warning"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} created Successfully</h4>
      </div>
    );
  };
  const errrorMessage = () => {
    return (
      <div
        className="alert alert-warning"
        style={{ display: error ? "" : "none" }}
      >
        <h4>{error}</h4>
      </div>
    );
  };

  const createProductForm = () => (
    <div>
      <form className="shadow-md border-2 p-4 py-2 m-5">
        <span>Post photo</span>
        <div className="form-group">
          <label className="btn btn-block btn-success mb-2">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            name="photo"
            className="form-control mb-2"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange("description")}
            name="photo"
            className="form-control mb-2"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="form-group">
          <select
            onChange={handleChange("category")}
            className="form-control mb-2"
            placeholder="Category"
          >
            <option>Select</option>
            {categories &&
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group mb-2">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control mb-2"
            placeholder="Quantity"
            value={stock}
          />
        </div>

        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success mb-2"
        >
          Create Product
        </button>
      </form>
      <div>
        <Link className="btn btn-sm btn-info mb-3 ml-14" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    </div>
  );

  return (
    <Base>
      <div></div>

      <div className="col-md-8 offset-md-2">
        {successMessage()}
        {errrorMessage()}
        {createProductForm()}
      </div>
    </Base>
  );
};

export default AddProduct;
