import Nav from "../components/Nav"
import { useContext } from "react"
import dp from "../assets/dp.png"
import { FaCamera } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import { userDataContext } from "../assets/context/UserDataContext"
import EditProfile from "../components/EditProfile";
function Home() {
  let{userData,edit,setEdit}=useContext(userDataContext)
  
  return (
    <div className="w-full min-h-[100vh] bg-[#f0efe7] pt-[100px] flex items-start justify-center gap-[20px] px-[20px] flex-col lg:flex-row">
    {edit && <EditProfile/>}
      <Nav />

      <div className="w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg rounded-lg p-[10px] relative ">
        <div className="w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center realtive cursor-pointer " onClick={()=>setEdit(true)}>
          <img src={userData.coverImage||""} alt="" className="w-full" />
          <FaCamera className="absolute right-[20px] top-[20px] w-[25px] h-[25px] text-gray-800 cursor-pointer"/>
          
        </div>
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center absolute top-[65px] left-[35px] cursor pointer" onClick={()=>setEdit(true)}>
          <img src={userData.profileImage||dp} alt="" className="h-full" />
        </div>
        <div className="w-[20px] h-[20px] bg-[#0A66C2] absolute top-[110px] left-[87px] rounded-full flex justify-center items-center cursor pointer">
          <MdAdd className="text-white"/>
        </div>

        <div className="mt-[30px] pl-[20px] font-semibold text-gray-700">
          <div className="text-[22px]">{`${userData.firstName} ${userData.lastName}`}</div>
          <div className="text-[18px] font-semibold text-gray-600">{userData.headline||""}</div>
           
          
          <div className="text-[16px] text-gray-500">{`${userData.location}`}</div>

        </div>
        <button className="w-[100%] h-[40px] my-[20px] rounded-full border-2 border-[#0A66C2] text-[#0A66C2] flex items-center justify-center gap-[10px]"  onClick={()=>setEdit(true)}>Edit Profile <FaPenToSquare /></button>
      </div>
      <div className="w-full lg:w-[50%] min-h-[200px] bg-[white] ">

      </div>
      <div className="w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg rounded-lg p-[10px]">

      </div>
    </div>
  )
}

export default Home