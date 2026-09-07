import { useState } from "react"
import dp from "../assets/dp.png"
import { AiOutlineLike } from "react-icons/ai";
import moment from "moment"
import { MdOutlineInsertComment } from "react-icons/md";
function Post({  author, like, description, image, createdAt }) {
  let [more, setMore] = useState(false)
  return (

    <div className="w-full min-h-[200px] flex flex-col gap-[10px] bg-white rounded-lg shadow-lg p-[20px] mt-[30px]">

      <div className="flex justify-between items-center">
        <div className="flex justify-center items-start gap-[10px]">

          <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer">
            <img src={author.profileImage || dp} alt="" className=" h-full" />
          </div>

          <div className="">
            <div className="text-[22px] font-semibold">{`${author.firstName} ${author.lastName}`}</div>
            <div className="text-[16px] font-semibold text-gray-600">{author.headline || ""}</div>
            <div className="text-[16px] ">{moment(createdAt).fromNow()}</div>


          </div>

        </div>

        <div className="">
          {/*button*/}
        </div>
      </div>

      <div className={`w-full ${!more ? "max-h-[100px] overflow-hidden" : ""} pl-[50px]`}>
        {description}
      </div>
      <div
        className="text-[17px] font-semibold pl-[50px] cursor-pointer"
        onClick={() => setMore(prev => !prev)}
      >
        {more ? "read less..." : "read more..."}
      </div>

      {image &&
        <div className="w-full h-[300px] overflow-hidden flex justify-center rounded">
          <img src={image} alt="" className="h-full rounded-lg" />
        </div>
      }

      <div className="">

        <div className="w-full flex justify-between items-center p-[20px] border-b-2 border-gray-500">
          <div className="flex items-center justify-center gap-[5px] text-[18px]">
            <AiOutlineLike className="text-[#0A66C2] w-[20px] h-[20px]"/><span>{like.length}</span></div>
          <div className="flex items-center justify-center gap-[5px]"><span>{Comment.length} <span>Comments</span></span></div>
        </div>

        <div className="flex justify-start items-center w-full p-[20px] gap-[20px]">
          <div className="flex justify-center items-center gap-[5px]"><AiOutlineLike className=" w-[24px] h-[24px]"/> <span>Like</span></div>
          <div className="flex justify-center items-center gap-[5px]"><MdOutlineInsertComment className="w-[24px] h-[24px]"/><span>Comment</span></div>




        </div>

      </div>

    </div>

  )
}

export default Post
