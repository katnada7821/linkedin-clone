import Nav from "../components/Nav"
import Post from "../components/Post"
import { FaCamera } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import dp from "../assets/dp.png"
import { useContext, useState, useEffect } from "react"
import { userDataContext } from "../assets/context/UserDataContext"
import { FaPenToSquare } from "react-icons/fa6";
import axios from "axios"
import { authDataContext } from "../assets/context/AuthDataContext";
import EditProfile from "../components/EditProfile";


function Profile() {

  let { profileData, edit, setEdit,postData} = useContext(userDataContext)

  let { serverUrl } = useContext(authDataContext)

  let [userConnection, setUserConnection] = useState([])
  useEffect(() => {

    const handleGetUserConnection = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/connection`, { withCredentials: true })
        setUserConnection(result.data)

      } catch (error) {
        console.log(error)

      }
    }
    handleGetUserConnection()
  })
const profilePost = postData.filter(
  (post) => post.author._id === profileData._id
);
  return (
    <div className="w-full min-h-[100vh] bg-[#f0efe7] flex flex-col items-center pt-[100px]">
      <Nav />
      {edit && <EditProfile />}
      <div className="w-full max-w-[900px] min-h-[100vh] flex flex-col gap-[10px]">
        <div className="relative bg-white pb-[40px] rounded shadow-lg">

          <div className="w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center relative cursor-pointer " onClick={() => setEdit(true)}>
            <img src={profileData.coverImage || ""} alt="" className="w-full" />
            <FaCamera className="absolute right-[20px] top-[20px] w-[25px] h-[25px] text-gray-300 cursor-pointer" />

          </div>
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center absolute top-[65px] left-[35px] cursor pointer" onClick={() => setEdit(true)}>
            <img src={profileData.profileImage || dp} alt="" className="h-full" />
          </div>
          <div className="w-[20px] h-[20px] bg-[#0A66C2] absolute top-[110px] left-[87px] rounded-full flex justify-center items-center cursor pointer">
            <MdAdd className="text-white" />
          </div>

          <div className="mt-[30px] pl-[20px] font-semibold text-gray-700">
            <div className="text-[22px]">{`${profileData.firstName} ${profileData.lastName}`}</div>
            <div className="text-[18px] font-semibold text-gray-600">{profileData.headline || ""}</div>


            <div className="text-[16px] text-gray-500">{`${profileData.location}`}</div>
            <div className="text-[16px] text-gray-500">{`${userConnection.length} connections`}</div>

          </div>
          <button className="min-w-[150px] h-[40px] my-[20px] ml-[10px] rounded-full border-2 border-[#0A66C2] text-[#0A66C2] flex items-center justify-center gap-[10px]" onClick={() => setEdit(true)}>Edit Profile <FaPenToSquare /></button>
        </div>
        <div className="w-full h-[100px] flex-items-center p-[20px] text-[22px] text-gray-600 font-semibold bg-white shadow-lg rounded-lg">{`Post(${profilePost.length})`}</div>
        {profilePost.map((post,index) => (
           <Post key={index} id={post._id} description={post.description} author={post.author} image={post.image} like={post.like} comment={post.comment} createdAt={post.createdAt} />
        ))}
        {profileData.skills?.length > 0 && (
    <div className='w-full flex flex-col gap-5 p-[30px] font-semibold bg-white shadow-lg rounded-lg'>

        <div className='text-[22px] text-gray-600'>
            Skills
        </div>

        <div className='flex flex-wrap justify-start items-center gap-3 text-gray-600'>
            {profileData.skills.map((skill, index) => (
                <div
                    key={index}
                    className='px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-[14px] font-medium'
                >
                    {skill}
                </div>
            ))}
        </div>

        <button
            className='w-fit min-w-[150px] h-[40px] px-5 rounded-full border-2 border-[#0A66C2] text-[#0A66C2] flex items-center justify-center gap-2 hover:bg-blue-50 transition-all'
            onClick={() => setEdit(true)}
        >
            Add Skills
        </button>

    </div>
)}
{profileData.education?.length > 0 && (
    <div className='w-full flex flex-col gap-5 p-[30px] font-semibold bg-white shadow-lg rounded-lg'>

        <div className='text-[22px] text-gray-600'>
            Education
        </div>

        <div className='flex flex-col justify-start items-start gap-3 text-gray-600 p-[20px]'>
            {profileData.education.map((edu) => (
              <>
              <div className="text-[20px]">College: {edu.college}</div>
              <div className="text-[20px]">Degree: {edu.degree}</div>
              <div className="text-[20px]">Field of Study: {edu.fieldofstudy}</div>
              </>
                
            ))}
        </div>

        <button
            className='w-fit min-w-[150px] h-[40px] px-5 rounded-full border-2 border-[#0A66C2] text-[#0A66C2] flex items-center justify-center gap-2 hover:bg-blue-50 transition-all'
            onClick={() => setEdit(true)}
        >
            Add Education
        </button>

    </div>
)}
{profileData.experience?.length > 0 && (
    <div className='w-full flex flex-col gap-5 p-[30px] font-semibold bg-white shadow-lg rounded-lg'>

        <div className='text-[22px] text-gray-600'>
            Experience
        </div>

        <div className='flex flex-col justify-start items-start gap-3 text-gray-600 p-[20px]'>
            {profileData.experience.map((exp) => (
              <>
              <div clasName="text-[20px]">Title: {exp.title}</div>
              <div clasName="text-[20px]">Company: {exp.company}</div>
              <div clasName="text-[20px]">Description: {exp.description}</div>
              </>
                
            ))}
        </div>

        <button
            className='w-fit min-w-[150px] h-[40px] px-5 rounded-full border-2 border-[#0A66C2] text-[#0A66C2] flex items-center justify-center gap-2 hover:bg-blue-50 transition-all'
            onClick={() => setEdit(true)}
        >
            Add Experience
        </button>

    </div>
)}
        




      </div>

    </div >
  )
}

export default Profile
