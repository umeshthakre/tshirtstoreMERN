import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const { user, token } = isAuthenticated();
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const { name } = values;
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    setValues({ ...values, [name]: value });
  };

  const redirectAdmin = () => {
    if (success) {
      return <Redirect to="/admin/dashboard" />;
    }
  };

  const onSubmit = (event) => {
    if (values.name === "") {
      setError({ ...error, error: true });
      return;
    }
    event.preventDefault();
    console.log(values);
    updateCategory(match.params.categoryId, user._id, token, values).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setValues({ name: "" });
          setSuccess(true);
        }
      }
    );
  };

  const preloadCategory = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, name: data.name });
      }
    });
  };

  useEffect(() => {
    preloadCategory(match.params.categoryId);
  }, []);

  const successMessage = (next) => {
    return (
      <div
        className="alert alert-warning"
        style={{ display: success ? "" : "none" }}
      >
        <h4> Category Updated Successfully</h4>
      </div>
    );
  };
  const errrorMessage = () => {
    return (
      <div
        className="alert alert-warning"
        style={{ display: error ? "" : "none" }}
      >
        <h4></h4>
      </div>
    );
  };

  const createCategoryForm = () => (
    <form>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success"
      >
        Update Category
      </button>
      <div>
        <Link className="btn btn-sm btn-info mb-3 " to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    </form>
  );

  return (
    <Base>
      {successMessage()}
      {errrorMessage()}
      {createCategoryForm()}
      {redirectAdmin()}
    </Base>
  );
};

export default UpdateCategory;
