import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FcSearch } from "react-icons/fc";
import { FaPlus } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgNotes } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Navbar = () => {
  const [openRight, setOpenRight] = React.useState(false);
  const [prompt, setPrompt] = useState("");
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate()
  const path = useLocation().pathname
  //console.log(path)
  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <>
      <div className="lg:flex hidden items-center justify-between p-6 py-4 border-b fixed top-0 z-50 bg-white w-full">
        {/* //!Large Screen Nav Start */}

        <div className="w-36">
          <Link to="/">
            <img src={logo} alt="" sizes="30" className="" />
          </Link>
        </div>

       {path === '/'? <div className="flex justify-center items-center space-x-0 border rounded-2xl p-3 border-gray-300 gap-3">
          
          <input
            type="text"
            className=" rounded-2xl w-96 text-gray-700 h-full text-lg font-medium outline-none hover:border-black"
            placeholder="Search Blogs"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <FcSearch className="text-3xl cursor-pointer" onClick={()=>navigate(prompt?"?search="+prompt:navigate('/'))} />
        </div>:null}

        {user ? (
          <div className="flex items-center justify-center space-x-2 md:space-x-0">
            <Link to="/write">
              <Button
                variant="text"
                className="flex items-center gap-1 text-sm"
              >
                <FaPlus />
                Create
              </Button>
            </Link>{" "}
            <Link to="/profile">
              <Button
                variant="text"
                className="flex items-center gap-1 text-sm"
              >
                <FaUserAlt />
                Profile
              </Button>
            </Link>
            <Button
              variant="outlined"
              color="red"
              size="sm"
              className="flex items-center gap-1 text-sm"
              onClick={handleLogout}
            >
              <IoLogOut />
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2 md:space-x-4">
            <Link to="/login">
              <Button variant="outlined">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="outlined">Register</Button>
            </Link>
          </div>
        )}

        {/* //!Large Screen Nav End */}
      </div>
      {/* //!Mobile Nav Start */}
      <div className="lg:hidden p-3">
        <div className="flex justify-between items-center">
          <div>
            <img src={logo} alt="" className="w-20" />
          </div>
          <div className="flex items-center border p-2 rounded-2xl gap-1 flex-row w-fit">
           
            <input
              type="text"
              className=" rounded-2xl text-gray-700 text-sm font-medium outline-none hover:border-black"
              placeholder="Search Blogs"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
             <FcSearch size={15} onClick={()=>navigate(prompt?"?search="+prompt:navigate('/'))}/>
          </div>
          <div>
            <RxHamburgerMenu onClick={openDrawerRight} />
          </div>
        </div>
      </div>
      {/* //!Mobile Nav End */}

      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            <Link to="/">
              <img src={logo} alt="" className="w-20" />
            </Link>
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        {user ? (
          <div className="flex items-center justify-center space-x-2 md:space-x-0 flex-col gap-10">
            <Link
              to="/write"
              className="border p-1 rounded-2xl border-gray-400 w-full flex items-center justify-center"
            >
              <Button
                variant="text"
                className="flex items-center gap-1 text-sm"
              >
                <FaPlus />
                Create
              </Button>
            </Link>{" "}
            <Link
              to="/profile/:id"
              className="border p-1 rounded-2xl border-gray-400 w-full flex items-center justify-center"
            >
              <Button
                variant="text"
                className="flex items-center gap-1 text-sm"
              >
                <FaUserAlt />
                Profile
              </Button>
            </Link>
            <Link
              to="/about-us"
              className="border p-1 rounded-2xl border-gray-400 w-full flex items-center justify-center"
            >
              <Button
                variant="text"
                className="flex items-center gap-1 text-sm"
              >
                <CgNotes />
                About Us
              </Button>
            </Link>{" "}
            <Link
              to="/contact-us"
              className="border p-1 rounded-2xl border-gray-400 w-full flex items-center justify-center"
            >
              <Button
                variant="text"
                className="flex items-center gap-1 text-sm"
              >
                <FaPhoneAlt />
                Contact Us
              </Button>
            </Link>{" "}
            <Button
              variant="gradient"
              color="red"
              size="sm"
              className="flex items-center gap-1 text-sm"
              onClick={handleLogout}
            >
              <IoLogOut />
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2 md:space-x-4 flex-col gap-10">
            <Link
              to="/login"
              className="border p-1 rounded-2xl border-gray-400 w-full flex items-center justify-center"
            >
              <Button variant="text">Login</Button>
            </Link>
            <Link
              to="/register"
              className="border p-1 rounded-2xl border-gray-400 w-full flex items-center justify-center"
            >
              <Button variant="text">Register</Button>
            </Link>
            <Link
              to="/about-us"
              className="border p-1 rounded-2xl border-gray-400 w-full flex items-center justify-center"
            >
              <Button
                variant="text"
                className="flex items-center gap-1 text-sm"
              >
                <CgNotes />
                About Us
              </Button>
            </Link>{" "}
            <Link
              to="/contact-us"
              className="border p-1 rounded-2xl border-gray-400 w-full flex items-center justify-center"
            >
              <Button
                variant="text"
                className="flex items-center gap-1 text-sm"
              >
                <FaPhoneAlt />
                Contact Us
              </Button>
            </Link>{" "}
          </div>
        )}
        <Typography className="mt-10 text-center font-semibold text-blue-600 text-sm">
          <Link
            to="https://www.linkedin.com/in/pramendra-shukla-11812a221/"
            target="_blank"
          >
            Created and maintained by <br /> Pramendra Shukla
          </Link>
        </Typography>
      </Drawer>
    </>
  );
};

export default Navbar;
