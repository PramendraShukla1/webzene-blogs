import React from "react";
import { Img } from "../utils/imgUrl";

const HomePosts = ({post}) => {


const postDesc = post.desc

const newDesc = postDesc.slice(0,500)+"...";




  return (
    <div>
    

     <div className=" w-full flex lg:mt-10 mt-0 pb-10 lg:pb-0 space-x-4 flex-col">
        <div className="flex lg:flex-row flex-col p-10 gap-10">
          {/* left */}
          <div className="lg:w-[35%] w-full h-fit flex justify-center items-center rounded-2xl">
            <img src={Img+post.photo} alt="" className="w-[450px] rounded-2xl " />
          </div>

          {/* Right */}

          <div className="flex flex-col lg:w-[65%] w-full justify-center  gap-2">
            <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
              {post.title}
            </h1>
            <div className="flex mb-2 text-sm font-semibold text-gray-500 justify-start gap-1 md:mb-4 flex-col">
              <div>
                <p>{post.username}</p>
              </div>
              <div className="flex space-x-2">
                <p>{new Date(post.updatedAt).toString().slice(0,25)}</p>
                
              </div>
            </div>
            <p className="text-sm md:text-lg text-justify lg:text-wrap font-medium text-gray-700">
              {newDesc}
            </p>
            <hr className=" mt-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePosts;
