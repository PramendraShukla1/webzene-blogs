import React, { useContext } from 'react'
import { FaUser } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Comments = ({comment, post}) => {

  const {user} = useContext(UserContext)
  
  const handleDeleteComment = async(id) =>{
    try {
      const res = await axios.delete(`/api/comments/${id}`,{withCredentials:true}) 
      window.location.reload(true)
    } catch (error) {
      console.log(error)
    }
   
  }

  return (
    <>
    {/* Comment */}
    <div className="lg:w-5/6 w-full border mt-10 rounded-2xl lg:p-10 p-3 pt-5 h-full">
    <h1 className="text-xl font-bold">Comments:</h1>
    <div className="flex gap-4 mt-5 flex-wrap">
      <div className="border border-gray-300 w-full rounded-xl h-full lg:p-7 p-3  font-semibold text-gray-800">
          <div className="flex h-full w-full justify-between gap-3 min-h-10">
          <p className="lg:w-4/5 font-medium text-justify  w-full">{comment.comment}</p>
         
          <p className="lg:w-2/5 h-full text-gray-600 text-sm lg:text-base flex items-center justify-center place-content-center">{new Date(comment.updatedAt).toString().slice(0, 25)}</p>
         
       
          </div>
       <div className="mt-10 text-gray-600">
          <h1 className="flex items-center gap-1 text-sm lg:text-base"><FaUser/>{comment.author}</h1>
         {user?._id === post?.userId ?  <div className="flex gap-3 mt-2">
          <p className="hover:text-black cursor-not-allowed text-sm lg:text-base">
        <BiEdit className="lg:text-3xl text-2xl"/>
      </p>
      <p className="hover:text-black cursor-pointer">
        <MdDelete className="lg:text-3xl text-2xl hover:text-red-600" onClick={()=>handleDeleteComment(comment._id)}/>
      </p>
          </div>:null}
          
       </div>
      </div>
    </div>



   

   

   
  </div>
  </>
  )
}

export default Comments