import React, { useContext, useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";


const Home = () => {
  const {user} = useContext(UserContext)
  const [posts, setPosts] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loader, setLoader] = useState(false);
  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get("/api/posts/" + search);
      //console.log(res.data)
      setPosts(res.data);
      if (res.data.length == 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(posts)

  const { search } = useLocation();
  // console.log(search)

  useEffect(() => {
    fetchPost();
  }, [search]);

  return (
    <div className="lg:mt-40 mt-0">
      {loader?<div className="mt-0 flex justify-center items-center min-h-screen place-content-center"><Loader/></div>:!noResult ? (
        posts.map((post) => (
          <>
          <Link to={user?`/posts/post/${post._id}`:'/login'}>
            <HomePosts key={post.id} post={post} />
          </Link>
          </>
        ))
      ) : (
        <div className="min-h-screen flex justify-center items-start lg:text-6xl text-3xl font-bold underline underline-offset-8">
          <h1>No Post Available</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
