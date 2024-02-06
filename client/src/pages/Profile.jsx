import React, { useContext, useEffect, useState } from "react";
import icon from "../assets/user3d.png";
import logo from "../assets/logo.png";
import { Button } from "@material-tailwind/react";
import thought from "../assets/thought_new.png";
import ProfilePosts from "../components/ProfilePosts";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import noPosts from "../assets/no Posts.png"

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const [posts, setPosts] = useState('')
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/api/users/${user._id}`);
      //console.log(res.data)
      setUsername(res.data.username);
      setEmail(res.data.email);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleProfileUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        `/api/users/` + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      //console.log(res.data)
      setUpdated(true);
    } catch (error) {
      console.log(error);
      setUpdated(false);
    }
  };

  const handleProfileDelete = async () => {
    try {
      const res = await axios.delete(`/api/users/` + user._id, {
        withCredentials: true,
      });
      //console.log(res.data)

      handleLogout();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserPosts = async () =>{
    try {
      const res = await axios.get(`/api/posts/user/${id}`)
setPosts(res.data)
console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
fetchUserPosts()
  },[id])

  return (
    <>
      <div className="lg:mt-28 mt-0 w-full flex justify-center items-center bg-gray-200 lg:p-20 p-5">
        <div className="h-full w-full flex lg:flex-row flex-col bg-white rounded-2xl lg:max-w-screen-2xl items-center shadow-lg">
          {/* left div */}
         
          <div className=" lg:w-1/2 w-full flex justify-center items-center h-fit relative">
            <img src={icon} alt="" className="w-auto h-auto lg:flex hidden z-10" />
          </div>
          <div className="bg-purple-200 h-[550px] w-[200px] absolute left-24 lg:flex hidden rounded-2xl shadow-2xl opacity-50"/>
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
                <img
                  src={thought}
                  alt=""
                  className="w-full h-full rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-3 w-full h-full text-center">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="border p-3 rounded-xl w-full lg:text-lg text-sm font-semibold text-gray-800 "
                  placeholder="Your Name"
                ></input>
                <input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="border p-3 rounded-xl w-full lg:text-lg text-sm font-semibold text-gray-800 "
                ></input>

                {/* <input value={password} type="password" onChange={(e)=>setPassword(e.target.value)} placeholder ="Your Password" className="border p-3 rounded-xl w-full lg:text-lg text-sm font-semibold text-gray-800 ">
               
              </input> */}
              </div>
              <div className="flex flex-row gap-5 w-full">
                <Button className="w-1/2" onClick={handleProfileUpdate}>
                  Update
                </Button>
                <Button className="w-1/2" onClick={handleProfileDelete}>
                  Delete
                </Button>
              </div>
              <Button
                variant="gradient"
                color="red"
                className="w-full"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </div>
            <div>
              {updated ? (
                <div className="flex justify-center mt-4">
                  <p className="text-green-600">
                    User Profile Updated Successfully
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          {/* right div */}
        </div>
        
      </div>
      <div className="bg-gray-200 p-20 pb-1 text-center lg:text-start">
      <h1 className="lg:text-6xl text-3xl font-semibold text-gray-800 mb-10 lg:mb-0">Your Posts</h1>
      </div>
      
      {Array.isArray(posts) && posts.length > 0 ? (
  posts.map((post) => (
    <ProfilePosts post={post} key={post._id} />
  ))
) : (
  <div className="lg:p-20 p-10 bg-gray-200 flex justify-center flex-col">
    <div className="w-full lg:max-w-screen-2xl flex bg-white rounded-2xl shadow-xl lg:p-20 p-5 lg:flex-col flex-col min-h-full justify-center gap-10 pt-20">
      <div className="flex justify-center">
        <img src={noPosts} alt="" className="lg:w-96" />
      </div>
      <div className="flex justify-center items-center h-full place-content-center">
        <h1 className="h-full lg:text-3xl text-xl font-bold text-gray-700">
          Sorry, No Posts Available
        </h1>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Profile;
