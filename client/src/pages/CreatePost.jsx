import React, { useContext, useState } from "react";
import icon from "../assets/write_blog.png";
import logo from "../assets/logo.png";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const CreatePost = () => {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user?.username,
      userId: user?._id,
      categories: cats,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("img", fileName);
      data.append("file", file);
      post.photo = fileName;

      try {
        const imgUpload = await axios.post("/api/upload", data);
        //console.log(imgUpload.data);
      } catch (error) {
        console.log(error);
      }
    }
    //Post upload
    try {
      const res = await axios.post(
        "/api/posts/create",post,
        { withCredentials: true }
      );
      //console.log(res.data);
      navigate(`/posts/post/${res.data._id}`)
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = () => {
    let updatedCat = [...cats];
    updatedCat.push(cat);
    setCat("");
    setCats(updatedCat);
  };
  const deleteCategory = (index) => {
    let updatedCats = [...cats];
    updatedCats.splice(index);
    setCats(updatedCats);
  };
  return (
    <div className=" w-full justify-center items-center bg-gray-200  mt-0 lg:mt-24 min-h-screen lg:p-20 p-5 flex flex-col">
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
            <h1 className="text-3xl font-semibold">Webzene Blog Writer</h1>
          </div>
          <form action="" className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-4 justify-center items-center mt-10">
              <input
                type="text"
                required
                className="p-3 border w-full rounded-xl outline-none font-semibold text-gray-700"
                placeholder="Post Title"
                
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="flex gap-5 w-full flex-col lg:flex-row">
                <input
                  type="text"
                  required
                  className="p-3 border lg:w-4/5 w-full rounded-xl outline-none font-semibold text-gray-700"
                  placeholder="Write Tags Here"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                />
                <Button
                  onClick={addCategory}
                  variant="gradient"
                  className="lg:w-1/5 w-full"
                >
                  Add Tag
                </Button>
              </div>
              <div className="flex gap-5 w-full flex-wrap mt-3 mb-5 justify-around">
                {cats?.map((item, index) => (
                  <p
                    key={index}
                    className="p-3 border rounded-xl font-semibold text-gray-700 flex items-center gap-2"
                  >
                    {item}{" "}
                    <MdDelete
                      onClick={() => deleteCategory(index)}
                      className="lg:text-2xl text-lg text-gray-600 hover:text-black cursor-pointer"
                    />
                  </p>
                ))}
              </div>
              <div className="w-full">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  className="border w-full p-5 text-lg font-medium outline-none rounded-xl"
                  placeholder="Write your blog here"
                 
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
              <input
                type="file"
                required
                className="p-3 border w-full rounded-xl outline-none font-semibold text-gray-700"
                placeholder="Upload File"
                
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <Button variant="gradient" onClick={handleCreatePost}>
              Post
            </Button>
          </form>
        </div>

        {/* right div */}
      </div>
    </div>
  );
};

export default CreatePost;
