import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";

import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import BraintreePayment from "./BraintreePayment";
import Card from "./Card";
import { loadCart } from "./helper/carthelper";
import { getProducts } from "./helper/coreapicalls";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const cart = true;

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div className=" col-span-8">
        {console.log(products)}
        <div className=" grid grid-cols-8 ml-3 mb-4">
          {products.map((product, index) => {
            return (
              <div className="col-span-2 m-1">
                <Card
                  key={product._id}
                  product={product}
                  addtoCart={false}
                  removeFromCart={true}
                  setReload={setReload}
                  reload={reload}
                  cart={cart}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>this section is for checkout</h2>
      </div>
    );
  };

  return (
    <Base>
      <div className="row text-center ">
        <h1 className="text-center">Your Cart</h1>
        <div className="row">
          <div className="col-8">
            {products.length > 0 ? loadAllProducts() : <h3>empty cart</h3>}
          </div>
          <div className="col-4">
            <BraintreePayment products={products} setReload={setReload} />
          </div>
        </div>
      </div>
    </Base>
  );
};
export default Cart;
