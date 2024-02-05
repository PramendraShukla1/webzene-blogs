import React from 'react'

const ProfilePosts = () => {
  return (
    <div>
         <div className="w-full flex bg-gray-200 lg:p-20 p-5 flex-col ">
<h1 className="text-4xl font-semibold text-gray-800">Your Posts</h1>

<div className=" w-full flex lg:mt-10 mt-0 pb-10 lg:pb-0 space-x-4 flex-col bg-white rounded-2xl shadow-xl">
      <div className="flex lg:flex-row flex-col p-10 gap-10">
        {/* left */}
        <div className="lg:w-[35%] w-full h-full flex justify-center items-center place-content-center rounded-2xl">
          <img
            src="https://images.pexels.com/photos/8728562/pexels-photo-8728562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="w-[450px] rounded-2xl"
          />
        </div>

        {/* Right */}

        <div className="flex flex-col lg:w-[65%] w-full justify-center  gap-2">
          <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
            10 Uses of Artificial Intelligence in Day to Day Life
          </h1>
          <div className="flex mb-2 text-sm font-semibold text-gray-500 justify-start gap-1 md:mb-4 flex-col">
            <div>
              <p>Pramendra Shukla</p>
            </div>
            <div className="flex space-x-2">
              <p>16/06/2023</p>
              <p>16:45</p>
            </div>
          </div>
          <p className="text-sm md:text-lg text-justify lg:text-wrap ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
            maiores tenetur, neque consequatur accusamus alias tempora
            repellendus odit nulla recusandae iusto quod perferendis itaque odio
            quidem ducimus dicta in? Cupiditate deserunt placeat dolorum alias
            reprehenderit ipsum omnis magnam officiis error, provident incidunt,
            aut facere molestias perspiciatis consectetur laboriosam sit
            minima?Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium incidunt quae porro, ullam voluptates rem nam nulla ut
            enim dolorum ad, laudantium doloribus architecto, omnis perspiciatis
            minima excepturi voluptatem similique. Laborum eum non nostrum
            rerum, dolorem, inventore voluptates eveniet iusto optio impedit
            asperiores amet ipsa tenetur suscipit culpa recusandae dolor?
          </p>
          <hr className=" mt-5" />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col p-10 gap-10">
        {/* left */}
        <div className="lg:w-[35%] w-full h-full flex justify-center items-center place-content-center rounded-2xl">
          <img
            src="https://images.pexels.com/photos/8728562/pexels-photo-8728562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="w-[450px] rounded-2xl"
          />
        </div>

        {/* Right */}

        <div className="flex flex-col lg:w-[65%] w-full justify-center  gap-2">
          <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
            10 Uses of Artificial Intelligence in Day to Day Life
          </h1>
          <div className="flex mb-2 text-sm font-semibold text-gray-500 justify-start gap-1 md:mb-4 flex-col">
            <div>
              <p>Pramendra Shukla</p>
            </div>
            <div className="flex space-x-2">
              <p>16/06/2023</p>
              <p>16:45</p>
            </div>
          </div>
          <p className="text-sm md:text-lg text-justify lg:text-wrap ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
            maiores tenetur, neque consequatur accusamus alias tempora
            repellendus odit nulla recusandae iusto quod perferendis itaque odio
            quidem ducimus dicta in? Cupiditate deserunt placeat dolorum alias
            reprehenderit ipsum omnis magnam officiis error, provident incidunt,
            aut facere molestias perspiciatis consectetur laboriosam sit
            minima?Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium incidunt quae porro, ullam voluptates rem nam nulla ut
            enim dolorum ad, laudantium doloribus architecto, omnis perspiciatis
            minima excepturi voluptatem similique. Laborum eum non nostrum
            rerum, dolorem, inventore voluptates eveniet iusto optio impedit
            asperiores amet ipsa tenetur suscipit culpa recusandae dolor?
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