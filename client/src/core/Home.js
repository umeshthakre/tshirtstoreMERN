import React, { useState, useEffect } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { nanoid } from "nanoid";
import Carousel from "react-elastic-carousel";
import banner from "./banner1.jpg";
import one from "./banner2.jpg";
import two from "./banner3.jpg";
const Home = () => {
  const [prodcts, setProdcuts] = useState([]);
  const [error, setError] = useState("");
  const [items, setItems] = useState([banner, one, two]);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProdcuts(data);
      }
    });
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 },
  ];

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base>
      <div className="row w-fit ">
        <hr className="seperator " />
        <div className="carousel-wrapper h-5/6">
          <Carousel
            breakPoints={breakPoints}
            className="w-full"
            enableAutoPlay={true}
            transitionMs={500}
            preventDefaultTouchmoveEvent={true}
            enableMouseSwipe={false}
          >
            <div class="container p-0 m-0 mt-2">
              <img src={banner} />
              <div class="text-block top-14 left-20">
                <h4>Upto 60% Off</h4>
                <p className="mt-4  text-5xl font-bold font-['Poppins']">
                  Women's Fashion
                </p>
                <button className="mybtn text-sm p-8 py-2 font-medium text-left rounded-md">
                  Shop Now
                </button>
              </div>
            </div>

            <div class="container p-0 m-0 mt-2">
              <img src={one} />
              <div class="text-block top-14 left-20">
                <h4>Upto 50% Off</h4>
                <p className="mt-4  text-5xl font-bold font-['Poppins']">
                  Men's Fashion
                </p>
                <button className="mybtn text-sm p-8 py-2 font-medium text-left rounded-md">
                  Shop Now
                </button>
              </div>
            </div>
            <div class="container p-0 m-0 mt-2">
              <img src={two} />
              <div class="text-block top-14 left-20">
                <h4>Upto 50% Off</h4>
                <p className="mt-4  text-5xl font-bold font-['Poppins']">
                  kid's Fashion
                </p>
                <button className="mybtn text-sm p-8 py-2 font-medium text-left rounded-md">
                  Shop Now
                </button>
              </div>
            </div>
          </Carousel>
        </div>
        <span className="text-center heading text-4xl ">
          Exclusive <span className="text-[#eb4d4b]">Prodcuts</span>
        </span>
        <div className="row p-5">
          {prodcts.map((product, index) => {
            return (
              <div className="col-3 mb-4">
                <Card key={nanoid()} product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};
export default Home;
