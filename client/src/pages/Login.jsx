import React, { useContext, useState } from "react";
import icon from "../assets/login.png";
import logo from "../assets/logo.png";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const {setUser} = useContext(UserContext)
 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password}, {withCredentials:true});
      console.log(res.data);
      navigate("/");
      setUser(res.data)
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-200 lg:p-20 p-5">
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
            <h1 className="text-3xl font-semibold">Webzene Login</h1>
          </div>
          <form action="" className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-4 justify-center items-center mt-10">
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
            <Button variant="gradient" onClick={handleLogin}>
              Login
            </Button>
          </form>
          <div className="flex justify-center mt-5">
            <p className="font-semibold">
              Don't have an account?{" "}
              <Link to={"/register"} className="text-blue-700">
                Register Here
              </Link>
            </p>
          </div>
          <div className="flex justify-center mt-3">
            {error ? (
              <div>
                <p className="lg:text-lg text-red-600">Something went wrong</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* right div */}
      </div>
    </div>
  );
};

export default Login;
