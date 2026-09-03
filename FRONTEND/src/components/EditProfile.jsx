import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { userDataContext } from "../assets/context/UserDataContext";
import dp from "../assets/dp.png"
import { MdAdd } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { useState } from "react"
function EditProfile() {
    let { edit, setEdit, userData } = useContext(userDataContext)
    let [firstName, setFirstName] = useState(userData.firstName || "")
    let [lastName, setLastName] = useState(userData.lastName || "")
    let [userName, setUserName] = useState(userData.userName || "")
    let [headline, setHeadline] = useState(userData.headline || "")
    let [location, setLocation] = useState(userData.location || "")
    let [gender, setGender] = useState(userData.gender || "")
    let [skills,setskills]=useState(userData.skills||[])
    let [newSkills,setNewSkills]=useState([])




    return (
        <div className="w-full h-[100vh] fixed top-0 z-[100] flex justify-center items-center">
            <div className="w-full h-full bg-black opacity-[0.5] absolute"></div>
            <div className="w-[90%] max-w-[500px] h-[600px] bg-white  overflow-auto relative z-[200] shadow-lg rounded-lg p-[10px]">
                <div className="absolute top-[10px] right-[10px] cursor-pointer" onClick={() => setEdit(false)}><RxCross2 className=" w-[25px] h-[25px] text-gray-700 font-semibold" /></div>

                <div className="w-full h-[150px] bg-gray-500 rounded-lg mt-[40px] overflow-hidden">
                    <img src="" alt="" className="w-full" />
                    <FaCamera className="absolute right-[20
                    px] top-[60px] w-[25px] h-[25px] text-gray-800 cursor-pointer" />
                </div>

                <div className="w-[80px] h-[80px] rounded-full overflow-hidden absolute top-[150px] ml-[10px] ">
                    <img src={dp} alt="" className="w-full h-full" />
                </div>
                <div className="w-[18px] h-[18px] bg-[#0A66C2] absolute top-[206px] left-[83px] rounded-full flex justify-center items-center cursor pointer">
                    <MdAdd className="text-white" />
                </div>

                <form className="w-full flex flex-col items-center justify-center gap-[10px] mt-[50px]" >


                    <input type="text" placeholder='firstName' className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]"value={firstName} onChange={(e)=>setFirstName(e.target.vakue)}
                    />
                    <input type="text" placeholder='lirstName' className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]"value={lastName} onChange={(e)=>setLastName(e.target.vakue)}
                    />
                    <input type="text" placeholder='userName' className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]"value={userName} onChange={(e)=>setUserName(e.target.vakue)}
                    />

                    <input type="text" placeholder='headline' className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]"value={headline} onChange={(e)=>setHeadline(e.target.vakue)}
                    />
                    <input type="text" placeholder='location' className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]"value={location} onChange={(e)=>setLocation(e.target.vakue)}
                    />
                    <input type="text" placeholder='gender(male/female/other)' className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]"value={gender} onChange={(e)=>setGender(e.target.vakue)}
                    />

                    <div className="\">
                        <h1 >Skills</h1>
                    </div>


                </form>


            </div>
        </div>
    )
}

export default EditProfile
