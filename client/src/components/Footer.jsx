import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <hr className="lg:mb-5" />
      <div className="flex lg:p-10 p-5 justify-between items-center lg:flex-row flex-col">
        <div>
          <Link to={"/"}>
            <img src={logo} alt="" className="w-32" />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="lg:text-lg text-sm font-bold">
            Webzene - All Rights Reserved
          </p>
          <Link
            to={"https://www.linkedin.com/in/pramendra-shukla-11812a221/"}
            target="_blank"
          >
            <p className="lg:text-lg text-sm cursor-pointer text-blue-400 font-bold hover:text-blue-800">
              Created and Maintained by Pramendra Shukla
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
