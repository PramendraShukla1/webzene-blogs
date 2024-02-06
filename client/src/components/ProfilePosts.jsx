import React from 'react'
import { Img } from '../utils/imgUrl'

const ProfilePosts = ({post}) => {
  console.log(post)
  return (
    <div>
         <div className="w-full flex bg-gray-200 lg:p-10 p-5 flex-col ">

<div className=" w-full flex lg:mt-0 mt-0 pb-10 lg:pb-0 space-x-4 flex-col bg-white rounded-2xl shadow-xl">
      <div className="flex lg:flex-row flex-col p-10 gap-10">
        {/* left */}
        <div className="lg:w-[35%] w-full h-full flex justify-center items-center place-content-center rounded-2xl">
          <img
            src={Img+post.photo}
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />
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
          <p className="text-sm md:text-lg text-justify lg:text-wrap ">
           {post.desc.slice(0,300)+"..."}
          </p>
          <hr className=" mt-5" />
        </div>
      </div>

      </div>
     
    </div>
    </div>
  )
}

export default ProfilePosts