import Nav from "../components/Nav"
import { FaCamera } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import dp from "../assets/dp.png"
import { useContext, useState,useEffect} from "react"
import { userDataContext } from "../assets/context/UserDataContext"
import { FaPenToSquare } from "react-icons/fa6";
import axios from "axios"
import { authDataContext } from "../assets/context/AuthDataContext";
import EditProfile from "../components/EditProfile";


function Profile() {
     let { userData, edit, setEdit} = useContext(userDataContext)
     let { serverUrl } = useContext(authDataContext)

     let[ userConnection,setUserConnection]=useState([])
       useEffect(() => {

     const handleGetUserConnection=async()=>{
      try{
        let result=await axios.get(`${serverUrl}/api/connection`,{ withCredentials: true })
        setUserConnection(result.data)

      }catch(error){
        console.log(error)

      }
     }
      handleGetUserConnection()
  })

  return (
    <div className="w-full min-h-[100vh] bg-[#f0efe7] flex flex-col items-center pt-[100px]">
        <Nav/>
        {edit && <EditProfile/>}
        <div className="w-full max-w-[900px] min-h-[100vh]">
        <div className="relative bg-white pb-[40px] rounded shadow-lg">
            
                    <div className="w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center relative cursor-pointer " onClick={() => setEdit(true)}>
                      <img src={userData.coverImage || ""} alt="" className="w-full" />
                      <FaCamera className="absolute right-[20px] top-[20px] w-[25px] h-[25px] text-gray-300 cursor-pointer" />
            
                    </div>
                    <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center absolute top-[65px] left-[35px] cursor pointer" onClick={() => setEdit(true)}>
                      <img src={userData.profileImage || dp} alt="" className="h-full" />
                    </div>
                    <div className="w-[20px] h-[20px] bg-[#0A66C2] absolute top-[110px] left-[87px] rounded-full flex justify-center items-center cursor pointer">
                      <MdAdd className="text-white" />
                    </div>
            
                    <div className="mt-[30px] pl-[20px] font-semibold text-gray-700">
                      <div className="text-[22px]">{`${userData.firstName} ${userData.lastName}`}</div>
                      <div className="text-[18px] font-semibold text-gray-600">{userData.headline || ""}</div>
            
            
                      <div className="text-[16px] text-gray-500">{`${userData.location}`}</div>
                      <div className="text-[16px] text-gray-500">{`${userConnection.length} connections`}</div>
            
                    </div>
                    <button className="min-w-[150px] h-[40px] my-[20px] ml-[10px] rounded-full border-2 border-[#0A66C2] text-[#0A66C2] flex items-center justify-center gap-[10px]" onClick={() => setEdit(true)}>Edit Profile <FaPenToSquare /></button>
                  </div>

        



        </div>
      
    </div >
  )
}

export default Profile
