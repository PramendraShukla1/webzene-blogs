import React, { useState } from "react";
import icon from "../assets/register.png";
import logo from "../assets/logo.png";
import { Button } from "@material-tailwind/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("api/auth/register", {
        username,
        email,
        password,
      });
      console.log(res.data);
      setEmail("");
      setPassword("");
      setUsername("");
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-200 lg:p-20 p-5">
      <ToastContainer />

      <div className="h-full w-full flex lg:flex-row flex-col bg-white rounded-2xl lg:max-w-screen-lg items-center shadow-lg">
        {/* left div */}
        <div className=" lg:w-1/2 w-full flex justify-center items-center h-fit">
          <img src={icon} alt="" className="w-auto h-auto lg:flex hidden" />
        </div>
        {/* left div */}
        {/* right div */}
        <div className=" bg-white p-10 lg:w-1/2 w-full rounded-2xl">
          <div className="flex justify-center p-10 pt-0">
            <img src={logo} alt="" className="w-40" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-semibold">Webzene Register</h1>
          </div>
          <form action="" className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-4 justify-center items-center mt-10">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="p-3 border w-full rounded-xl outline-none font-semibold text-gray-700"
                placeholder="Username"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 border w-full rounded-xl outline-none font-semibold text-gray-700"
                placeholder="Email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 border w-full rounded-xl outline-none font-semibold text-gray-700"
                placeholder="Password"
              />
            </div>
            <Button onClick={handleRegister} variant="gradient">
              Register
            </Button>
          </form>
          <div className="flex justify-center mt-5">
            <p className="font-semibold">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-700">
                Login Here
              </Link>
            </p>
          </div>
          <div className="flex justify-center mt-2">
            {error ? (
              <div>
                <p className="text-red-600 lg:text-lg">Something went wrong!</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* right div */}
      </div>
    </div>
  );
};

export default Register;
