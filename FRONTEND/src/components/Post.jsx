import { useState, useContext } from "react";
import dp from "../assets/dp.png";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { LuSendHorizontal } from "react-icons/lu";
import moment from "moment";
import { MdOutlineInsertComment } from "react-icons/md";
import axios from "axios";
import { authDataContext } from "../assets/context/AuthDataContext";
import { userDataContext } from "../assets/context/UserDataContext";

function Post({
    id,
    author,
    comment = [],
    like,
    description,
    image,
    createdAt
}) {

    let [more, setMore] = useState(false);
    let [likes, setLikes] = useState(like || []);
    let [commentContent,setCommentContent]=useState("")
    let [comments,setComments]=useState(comment||[])
    let [showComment,setShowComment]=useState(false)

    let { serverUrl } = useContext(authDataContext);

    let { userData} = useContext(userDataContext);


    const handleLike = async () => {
        try {

            let result = await axios.get(
                serverUrl + `/api/post/like/${id}`,
                { withCredentials: true }
            );

            setLikes(result.data.like);

        } catch (error) {
            console.log(error);
        }
    };

    const handleComment = async (e) => {
      e.preventDefault()
        try {

            let result = await axios.post(
                serverUrl + `/api/post/comment/${id}`,{content:commentContent},
                { withCredentials: true }
            );

            setComments(result.data.comment);
            setCommentContent(" ")

        } catch (error) {
            console.log(error);
        }
    };



    return (

        <div className="w-full min-h-[200px] flex flex-col gap-[10px] bg-white rounded-lg shadow-lg p-[20px] mt-[30px]">

            <div className="flex justify-between items-center">

                <div className="flex justify-center items-start gap-[10px]">

                    <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer">

                        <img
                            src={author?.profileImage || dp}
                            alt=""
                            className="h-full"
                        />

                    </div>


                    <div>

                        <div className="text-[22px] font-semibold">
                            {`${author?.firstName || ""} ${author?.lastName || ""}`}
                        </div>

                        <div className="text-[16px] font-semibold text-gray-600">
                            {author?.headline || ""}
                        </div>

                        <div className="text-[16px]">
                            {moment(createdAt).fromNow()}
                        </div>

                    </div>

                </div>


                <div>
                    {/* button */}
                </div>

            </div>


            <div
                className={`w-full ${
                    !more ? "max-h-[100px] overflow-hidden" : ""
                } pl-[50px]`}
            >
                {description}
            </div>


            <div
                className="text-[17px] font-semibold pl-[50px] cursor-pointer"
                onClick={() => setMore(prev => !prev)}
            >
                {more ? "read less..." : "read more..."}
            </div>


            {image && (
                <div className="w-full h-[300px] overflow-hidden flex justify-center rounded">

                    <img
                        src={image}
                        alt=""
                        className="h-full rounded-lg"
                    />

                </div>
            )}


            <div>

                <div className="w-full flex justify-between items-center p-[20px] border-b-2 border-gray-500">

                    <div className="flex items-center justify-center gap-[5px] text-[18px]">

                        <AiOutlineLike className="text-[#0A66C2] w-[20px] h-[20px]" />

                        <span>
                            {likes.length}
                        </span>

                    </div>


                    <div className="flex items-center justify-center gap-[5px] text-[#0A66C2] cursor-pointer"onClick={()=>setShowComment(prev=>!prev)}>

                        <span>
                            {comment.length} Comments
                        </span>

                    </div>

                </div>
              


                <div className="flex justify-start items-center w-full p-[20px] gap-[20px]">

                    {!likes.includes(userData._id)&& <div
                        className="flex justify-center items-center gap-[5px] cursor-pointer"
                        onClick={handleLike}
                    >

                        <AiOutlineLike className="w-[24px] h-[24px]" />

                        <span>
                            Like
                        </span>

                    </div>
}
{likes.includes(userData._id)&& <div
                        className="flex justify-center items-center gap-[5px] cursor-pointer"
                        onClick={handleLike}
                    >

                        <AiFillLike  className="w-[24px] h-[24px] text-[#0A66C2]" />

                        <span className="text-[#0A66C2]">
                            Liked
                        </span>

                    </div>
}


                    <div className="flex justify-center items-center gap-[5px] cursor-pointer" onClick={()=>setShowComment(prev=>!prev)}>


                        <MdOutlineInsertComment className="w-[24px] h-[24px]" />

                        <span>
                            Comment
                        </span>

                    </div>

                </div>
                {showComment&& <div className="">
                  <form className="w-full flex justify-between items-center border-b-2 border-b-gray-300 p-[10px]" onSubmit={handleComment}>
                    <input type="text" placeholder={"leave a comment"} className=" outline-none border-none" value={commentContent} onChange={(e)=>setCommentContent(e.target.value)}/>
                    <button><LuSendHorizontal className="text-[#0A66C2] w-[22px] h-[22px]"/></button>
                  </form>
                  <div className="flex flex-col gap-[12px]">

    {comments.map((com) => (

        <div
            key={com._id}
            className="flex items-start gap-[10px] border-b-2 border-b-gray-200 pb-[12px]"
        >

            {/* Profile Image */}
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0">
                <img
                    src={com.user?.profileImage || dp}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>


            {/* Comment Details */}
            <div className="flex flex-col gap-[2px]">

                {/* Name */}
                <div className="text-[16px] font-semibold text-gray-800">
                    {`${com.user?.firstName || ""} ${com.user?.lastName || ""}`}
                </div>


                {/* Time */}
                <div className="text-[13px] text-gray-500">
                    {moment(com.createdAt).fromNow()}
                </div>


                {/* Comment Content */}
                <div className="text-[15px] text-gray-800 mt-[4px]">
                    {com.content}
                </div>

            </div>

        </div>

    ))}

</div>
              

                </div>
}


                
            </div>

        </div>

    );
}

export default Post;