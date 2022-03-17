import React from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card mt-5 ml-3 mb-10">
        <h4 className="card-header bg-[#3FC1C9]">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category">Create Categories</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories">Manege Categories</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product">Create Products</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/product">Manege Products</Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="row">
        <div className="card mb-4 mt-5 col-8">
          <h4 className="card-header">Admin Information</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <span className="badge-success mr-2">Name:</span>
              {name}
            </li>
            <li className="list-group-item">
              <span className="badge-success mr-2">Email:</span>
              {email}
            </li>
            <li className="list-group-item bg-[#FC5185]">
              <span className="text-white text-center ">Admin Access</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Base>
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
