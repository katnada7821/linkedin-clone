import Nav from "../components/Nav"
import { useContext, useState } from "react"
import dp from "../assets/dp.png"
import { useRef } from "react"
import { FaCamera } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdAdd } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import axios from "axios"
import { userDataContext } from "../assets/context/UserDataContext"
import EditProfile from "../components/EditProfile";
import { authDataContext } from "../assets/context/AuthDataContext";
import { FaRegImages } from "react-icons/fa6";
function Home() {
  let { userData, edit, setEdit } = useContext(userDataContext)
  let [frontendImage, setFrontendImage] = useState("")
  let [backendImage, setBackendImage] = useState("")
  let [description, setDescription] = useState("")
  let [uploadPost, setUploadPost] = useState(false)
  let { serverUrl } = useContext(authDataContext)
  let image = useRef()
  let[posting,setPosting]=useState(false)

  function handleImage(e) {
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  async function handleUploadPost(){
    setPosting(true)
    
    
    try {
      let formdata = new FormData()
      formdata.append("description", description)
      

      if (backendImage) {
        formdata.append("image", backendImage)
      }
      

      let result = await axios.post(serverUrl + "/api/post/create", formdata, { withCredentials: true })
      console.log(result);
      setPosting(false)
      setUploadPost(false)

    } catch (error) {
      setPosting(false)
      console.log(error);
      


    }
  }


  return (
    <div className="w-full min-h-[100vh] bg-[#f0efe7] pt-[100px] flex items-center lg:items-start lg:justify-center gap-[20px] px-[20px] flex-col lg:flex-row relative">
      {edit && <EditProfile />}
      <Nav />

      <div className="w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg rounded-lg p-[10px] relative ">
        <div className="w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center relative cursor-pointer " onClick={() => setEdit(true)}>
          <img src={userData.coverImage || ""} alt="" className="w-full" />
          <FaCamera className="absolute right-[20px] top-[20px] w-[25px] h-[25px] text-gray-800 cursor-pointer" />

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

        </div>
        <button className="w-[100%] h-[40px] my-[20px] rounded-full border-2 border-[#0A66C2] text-[#0A66C2] flex items-center justify-center gap-[10px]" onClick={() => setEdit(true)}>Edit Profile <FaPenToSquare /></button>
      </div>
      {uploadPost && <div className="w-full h-full bg-black fixed top-0 z-[100] left-0 opacity-[0.6]"></div>}



      {uploadPost && <div className="w-[90%] max-w-[500px] h-[600px] bg-white shadow-lg rounded-lg fixed z-[200] p-[20px] flex items-start justify-start flex-col gap-[20px]">
        <div className="absolute top-[20px] right-[20px] cursor-pointer"><RxCross2 className=" w-[25px] h-[25px] text-gray-700 font-semibold cursor-pointer" onClick={() => setUploadPost(false)} /></div>
        <div className="flex justify-start items-center gap-[10px]">
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center cursor pointer">
            <img src={userData.profileImage || dp} alt="" className="h-full" />
          </div>
          <div className="text-[22px]">{`${userData.firstName} ${userData.lastName}`}</div>
        </div>
        <textarea name="" id="" className={`w-full ${frontendImage ? "h-[200px]" : "h-[550px]"} outline-none border-none p-[10px] resize-none text-[19px]`} placeholder="What do you want to talk about..?" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <input type="file" ref={image} hidden onChange={handleImage} />
        <div className="w-full h-[300px] overflow-hidden flex justify-center items-center rounded-lg">
          <img src={frontendImage || ""} alt="" className="h-full rounded-lg" />
        </div>

        <div className="w-full h-[200px] flex flex-col">
          <div className="p-[20px] flex items-center justify-start border-b-2 border-gray-500">
            <FaRegImages className="w-[24px] h-[24px] text-gray-500" onClick={() => image.current.click()} />
          </div>

          <div className="flex justify-end items-center">
            <button className="w-[100px] h-[40px] rounded-full border-2 bg-[#0A66C2] text-white mt-[15px]" disabled={posting} onClick={handleUploadPost}>
              {posting?"posting...":"post"}
            </button>
          </div>

        </div>


      </div>}



      <div className="w-full lg:w-[50%] min-h-[200px] bg-[#f0efe7]">
        <div className="w-full h-[100px] bg-white shadow-lg rounded-lg flex items-center justify-center gap-[10px]">
          <div className="w-[58px] h-[58px] rounded-ffull overflow-hidden flex items-center justify-center cursor-pointer">
            <img src={userData.profileImage || dp} alt="" className="h-full" />


          </div>
          <button className="w-[80%] h-[60px] border-2 rounded-full border-gray-500 flex items-center justify-center px-[20px] hover:bg-gray-200" onClick={() => setUploadPost(true)}>Start a post </button>

        </div>


      </div>
      <div className="w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg rounded-lg p-[10px]">

      </div>
    </div>
  )
}

export default Home