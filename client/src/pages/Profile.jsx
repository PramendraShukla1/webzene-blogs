import React from "react";
import icon from "../assets/user3d.png";
import logo from "../assets/logo.png";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import thought from "../assets/thought.png";
import ProfilePosts from "../components/ProfilePosts";

const Profile = () => {
  return (
    <>
    <div className="lg:mt-28 mt-0 w-full flex justify-center items-center bg-gray-200 lg:p-20 p-5">
      <div className="h-full w-full flex lg:flex-row flex-col bg-white rounded-2xl lg:max-w-screen-2xl items-center shadow-lg">
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
            <h1 className="text-3xl font-semibold">Pramendra's Profile</h1>
          </div>

          <div className="flex flex-col gap-4 items-center mt-0 h-full lg:p-10 p-3 rounded-xl">
            <div>
              <img src={thought} alt="" className="w-full h-full rounded-xl" />
            </div>
            <div className="flex flex-col gap-3 w-full h-full text-center">
              <p className="border p-3 rounded-xl w-full lg:text-lg text-sm font-semibold text-gray-800 ">
                Pramendra Shukla
              </p>
              <p className="border p-3 rounded-xl w-full lg:text-lg text-sm font-semibold text-gray-800 ">
                shuklapramendra99@gmail.com
              </p>
              <p className="border p-3 rounded-xl w-full lg:text-lg text-sm font-semibold text-gray-800 ">
                test12345
              </p>
            </div>
            <div className="flex flex-row gap-5 w-full">
              <Button className="w-1/2">Update</Button>
              <Button className="w-1/2">Delete</Button>
            </div>
            <Button variant="gradient"color="red" className="w-full">Log out</Button>
          </div>
        </div>

        {/* right div */}
      </div>

     
    </div>
   <ProfilePosts/>
    </>
  );
};

export default Profile;
