import logo2 from "../assets/logo2.png"
import { IoSearchSharp } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { IoMdNotifications } from "react-icons/io";
import dp from "../assets/dp.png"
import { useState, useContext } from "react"
import { userDataContext } from "../assets/context/UserDataContext.jsx"
import { authDataContext } from "../assets/context/AuthDataContext.jsx";
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Nav() {
    let [activeSearch, setActivesearch] = useState(false)
    let { userData, setUserData } = useContext(userDataContext)
    let [showPopup, setShowPopup] = useState(false)
    let navigate = useNavigate()
    let { serverUrl } = useContext(authDataContext)
    const handleSignOut = async () => {
        try {
            let result = await axios.post(
                serverUrl + "/api/auth/logout",
                {},
                { withCredentials: true }
            )
            setUserData(null)

            navigate("/login")
            console.log(result);

        } catch (error) {
            console.log(error)
        }
    }
    return (
       <div className="w-full h-[80px] bg-white fixed top-0 z-[999] shadow-lg flex justify-between md:justify-around items-center px-[10px]">
            <div className="flex justify-center items-center gap-[10px]">

                <div onClick={() => {
                    setActivesearch(false)
                }}>
                    <img src={logo2} alt="" className="w-[50px]" />
                </div>
                {!activeSearch && <div><IoSearchSharp className='w-[23px] h-[23px] text-gray-600 lg:hidden' onClick={() => setActivesearch(true)} /></div>
                }
                <form className={` w-[190px] lg:w-[350px] h-[40px] bg-[#f0efe7] lg:flex items-center gap-[10px] px-[10px] py-[5px] rounded-md ${!activeSearch ? "hidden" : "flex"}`}>
                    <div><IoSearchSharp className="w-[23px] h-[23px] text-gray-600" /></div>
                    <input type="text" className="w-[80%] h-full bg-transparent outline-none border-0" placeholder="search users..." />
                </form>
            </div>


            <div className="flex justify-center items-center gap-[20px]">

                {showPopup && <div className="w-[300px] min-h-[300px] bg-white shadow-lg absolute top-[90px] rounded-lg flex flex-col items-center p-[20px] gap-[20px]">
                    <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                        <img src={userData.profileImage||dp} alt="" className="w-full h-full" />
                    </div>
                    <div className="text-[19px] font-semibold"> {`${userData.firstName} ${userData.lastName}`}</div>
                    <button className="w-[100%] h-[40px] rounded-full border-2 border-[#0A66C2] text-[#0A66C2]">View Profile</button>
                    <div className="w-full h-[1px] bg-gray-700"></div>
                    <div className="flex w-full items-center justify-start text-gray-600 gap-[10px]"  onClick={()=>navigate("/network")}>
                        <HiUsers className="w-[23px] h-[23px] text-gray-600" />
                        <div  > My Networks</div>
                    </div>
                    <button className="w-[100%] h-[40px] rounded-full border-2 border-[#ec4545] text-[#ec4545]" onClick={handleSignOut}>Sign Out</button>

                </div>}

                <div className="lg:flex flex-col items-center justify-center text-gray-600 hidden">
                    <IoHome className="w-[23px] h-[23px] text-gray-600" />
                    <div> Home</div>
                </div>

                <div className="md:flex flex-col items-center justify-center text-gray-600 hidden cursor-pointer" onClick={()=>navigate("/network")}>
                    <HiUsers className="w-[23px] h-[23px] text-gray-600" />
                    <div  > My Networks</div>
                </div>

                <div className="flex flex-col items-center justify-center text-gray-600">
                    <IoMdNotifications className="w-[23px] h-[23px] text-gray-600" />
                    <div className="hidden md:block">Notifications</div>
                </div>

                <div>
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer" onClick={() => setShowPopup(prev => !prev)}>
                        <img src={userData.profileImage||dp} alt="" className="w-full h-full" />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Nav
