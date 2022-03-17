import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategories, deleteCategory } from "./helper/adminapicall";

const ManegeCategories = () => {
  const [values, setValues] = useState({
    categories: [],
    success: "",
    error: "",
  });

  const { user, token } = isAuthenticated();

  const { categories } = values;

  const getAllCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data);
        setValues({ ...values, categories: data, success: true });
        console.log(values);
      }
    });
  };

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          getAllCategories();
        }
      })
      .catch();
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category Name</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{category.name}</td>
                  <td>
                    <Link
                      className="btn btn-success"
                      to={`/admin/category/update/${category._id}`}
                    >
                      <span>Update</span>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        console.log("this is id" + category._id);
                        deleteThisCategory(category._id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* {categories.map((category, index) => (
            <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className=" text-left">{category.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${category._id}`}
                >
                  <span>Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    console.log("this is id" + category._id);
                    deleteThisCategory(category._id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </Base>
  );
};

export default ManegeCategories;
