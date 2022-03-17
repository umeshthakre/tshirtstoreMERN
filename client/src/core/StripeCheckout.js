import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/carthelper";

const StripeCheckout = ({
  product,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const { token } = isAuthenticated() && isAuthenticated().token;
  const { userId } = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    product.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <div>
        <button className="btn btn-success">Pay with stripe</button>
      </div>
    ) : (
      <div>
        <Link to="/signin">
          <button className="btn btn-warning"> Signin</button>
        </Link>
      </div>
    );
  };

  return (
    <div>
      stripeCheckout {getFinalPrice()}
      {showStripeButton()}
    </div>
  );
};
export default StripeCheckout;
