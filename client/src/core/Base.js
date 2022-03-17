import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#000000" };
  } else {
    return { color: "#FFFFFF" };
  }
};
const { user } = isAuthenticated();
const mern = `Full Stack MERN Developer`;
const mydes = `Hello I am Umesh, I am a ${mern}.I have developed this project 
using Reactjs at frontend , Nodejs REST api at backend using express framework,
mongodb as backend.I have used paypal as payment service using Braintree to 
integrate paypal in the app using React drop-in frontend If you are a Recruiter 
then please contact me for Admin access credentials at umeshthakrexyx@gmail.com.
To see the admin panel which allows admin to add and manage products and categories.`;
const Base = ({
  myTees = "myTees",

  children,
  history,
}) => {
  return (
    <div>
      <header>
        <nav className="grid grid-cols-12 w-full h-auto bg-[#12B0E8] shadow-md">
          <div className="col-span-1"></div>
          <div className="col-span-1 m-2 p-2">
            <div>{myTees}</div>
          </div>
          <div className="col-span-9 w-full">
            <ul className="flex justify-end w-full">
              <li className="m-2 p-2 hover:text-white transition">
                <Link style={currentTab(history, "/")} to="/">
                  Home
                </Link>
              </li>
              <li className="m-2 p-2 hover:text-white transition">
                <Link style={currentTab(history, "/cart")} to="/cart">
                  Cart
                </Link>
              </li>

              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="m-2 p-2 hover:text-white transition">
                  <Link
                    style={currentTab(history, "/admin/dashboard")}
                    to="/admin/dashboard"
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}

              {!isAuthenticated() && (
                <Fragment>
                  <li className="m-2 p-2 hover:text-white transition">
                    <Link style={currentTab(history, "/signup")} to="/signup">
                      Register
                    </Link>
                  </li>
                  <li className="m-2 p-2 hover:text-white transition">
                    <Link style={currentTab(history, "/signin")} to="/signin">
                      Sign In
                    </Link>
                  </li>
                </Fragment>
              )}
              {isAuthenticated() && (
                <li className="m-2 p-2 hover:text-white transition">
                  <span
                    className="m-2 p-2 hover:text-white transition"
                    onClick={() => {
                      signout(() => {
                        history.push("/");
                      });
                    }}
                  >
                    Signout
                  </span>
                </li>
              )}
            </ul>
          </div>
          <div className="col-span-1"></div>
        </nav>
      </header>
      {children}
      <footer>
        <div className="flex justify-center flex-col">
          <h1 className=" flex text-3xl ml-6">About me</h1>
          <p className="border-2 p-4 pt-2 ml-28 mt-10 break-words whitespace-normal w-3/4 shadow-md mb-4 ">
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
            <pre className="break-words">{mydes}</pre>
          </p>
        </div>
        <div className="relative text-center w-full h-autoshadow-md grid">
          <h1 className="mb-3">Let's Connect </h1>
        </div>
        <section id="lab_social_icon_footer " className="bg-[#12B0E8]">
          <link
            href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <div class="container p-1 ">
            <div class="text-center center-block">
              <a href="https://twitter.com/umeshxyz_xyz" className="m-2">
                <i id="social-tw" class="fa fa-twitter-square fa-3x social"></i>
              </a>
              <a href="https://www.linkedin.com/in/umesh-thakre-442353166/">
                <i
                  id="social-gp"
                  class="fa fa-linkedin-square fa-3x social"
                ></i>
              </a>
              <a href="mailto:#">
                <i id="social-em" class="fa fa-discord fa-3x social"></i>
              </a>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
};
export default withRouter(Base);
