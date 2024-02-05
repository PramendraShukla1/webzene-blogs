import React, { useContext, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Img } from "../utils/imgUrl";

import Comments from "../components/Comments";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Button } from "@material-tailwind/react";

const PostDetails = () => {
  const [post, setPost] = useState({});
  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePostComment = async (e) =>{
e.preventDefault()
try {
  const res = await axios.post('/api/comments/create',{comment:comment, author:user.username, postId:id, userId: user._id},{withCredentials:true})


  fetchPostComments()
  setComment("")
  window.location.reload(true)
} catch (error) {
  console.log(error)
}
  }

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(`/api/posts/${id}`, {
        withCredentials: true,
      });
      //console.log(res)
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = () =>{
    navigate(`/edit/${id}`)
  }

  const fetchPostComments = async() =>{
    try {
      const res = await axios.get(`/api/comments/posts/${id}`)
      console.log(res.data)
      setComments(res.data)
      setComment("")
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchPostComments()
  },[id])

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="mt-0 lg:mt-16 min-h-screen lg:p-20 p-5 flex flex-col items-center">
          <div className="lg:w-3/4 w-full lg:p-10 p-0 mb-10 lg:mb-0 flex justify-center">
            <img
              src={Img + post?.photo}
              alt=""
              className="rounded-2xl object-cover w-[400px] lg:w-[600px]"
            />
          </div>

          <h1 className="text-2xl font-bold text-black lg:5xl text-center">
            {post?.title}
          </h1>
          <div className="flex items-center justify-center space-x-2 flex-col">
            <div className="flex justify-between w-5/6 items-center mb-10 mt-5">
              <div className="flex flex-col font-bold lg:text-lg text-sm text-gray-800">
                <p>{post.username}</p>
                <p>{new Date(post.updatedAt).toString().slice(0, 25)}</p>
              </div>
              {user?._id === post?.userId ? (
                <div className="mt-3 flex gap-4 text-gray-700">
                  <p className="hover:text-black cursor-pointer" onClick={handleEditPost}>
                    <BiEdit className="lg:text-3xl text-2xl" />
                  </p>
                  <p
                    className="hover:text-black cursor-pointer"
                    onClick={handleDeletePost}
                  >
                    <MdDelete className="lg:text-3xl text-2xl" />
                  </p>
                </div>
              ) : null}
            </div>
            <div className="w-5/6 text-lg font-serif font-medium text-justify text-gray-800">
              <p>{post?.desc}</p>
            </div>
            <div className="lg:w-5/6 w-full border mt-10 h-full rounded-2xl lg:p-10 p-3 pt-5">
              <h1 className="lg:text-xl text-xl font-bold">Tags:</h1>

              <div className="flex gap-4 mt-5 flex-wrap justify-center w-fit h-fit">
                {Array.isArray(post?.categories)
                  ? post?.categories.map((item, index) => (
                      <h1
                        key={index}
                        className="p-3 border border-gray-600 rounded-xl font-bold"
                      >
                        {item.trim()}
                      </h1>
                    ))
                  : typeof post?.categories === "string" &&
                    post?.categories.split(",").map((item, index) => (
                      <h1
                        key={index}
                        className="p-3 border border-gray-600 rounded-xl font-bold"
                      >
                        {item.trim()}{" "}
                       
                      </h1>
                    ))}
              </div>
            </div>
            {comments?.map((comment)=>(
              <Comments key={comment._id} comment={comment} post={post}/>
            ))}

<div className="flex gap-4 mt-10 flex-wrap lg:mt-5">
    <h1 className="text-xl font-bold">Write Comments:</h1>
      <div className="border border-gray-300 w-full rounded-xl h-full p-7  font-semibold text-gray-800">
        <textarea onChange={(e)=>setComment(e.target.value)}name="" id="" cols="30" rows="3" className="w-full min-h-20 border rounded-2xl outline-none font-medium text-lg p-5" placeholder="Write Comment Here..."></textarea>
        <Button variant="gradient" className="mt-3" onClick={handlePostComment}>Submit</Button>
      </div>
    </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;
