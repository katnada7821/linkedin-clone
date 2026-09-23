import { useState,useEffect } from "react"
import { useContext } from "react"
import Nav from "../components/Nav"
import dp from "../assets/dp.png"
import { RxCrossCircled } from "react-icons/rx";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { authDataContext } from "../assets/context/AuthDataContext"
import axios from 'axios'


function Network() {
  let { serverUrl } = useContext(authDataContext)
  let [connections, setConnections] = useState([])

  useEffect(() => {
    const getRequests = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/connection/requests`,
          { withCredentials: true }
        )
        console.log(result.data)


        setConnections(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    getRequests()
  }, [serverUrl])

  const acceptConnection=async(requestId)=>{
    try{
      await axios.put(`${serverUrl}/api/connection/accept/${requestId}`,{},
          { withCredentials: true })
        
setConnections((prevConnections) =>
  prevConnections.filter((con) => con._id !== requestId)
)
    }catch(error){
      console.log(error)



    }
  }
  const rejectConnection=async(requestId)=>{
    try{
      await axios.put(`${serverUrl}/api/connection/reject/${requestId}`,{},
          { withCredentials: true })
          
          setConnections((prevConnections) =>
  prevConnections.filter((con) => con._id !== requestId)
)
    }catch(error){
      console.log(error)



    }
  }


  return (
    <div className="w-screen h-[100vh] bg-[#f0efe7] pt-[100px] px-[20px] flex flex-col gao-[40px]">
      <Nav />

      <div className="w-full h-[100px] bg-white shadow-lg rounded-lg flex items-center p-[10px] text-[22px] text-gray-600">
        Invitations {connections.length}
      </div>

      {connections.length > 0 && (
  <div className="w-full max-w-[700px] min-h-[100px] bg-white shadow-lg rounded-lg p-[10px] gap-[20px] mt-3 flex flex-col mx-auto">
    {connections.map((connection) => (
      <div
        key={connection._id}
        className="w-full min-h-[100px] flex justify-between items-center"
      >
        <div className="flex justify-center items-center gap-[10px]">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer">
            <img
              src={connection.sender.profileImage || dp}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="text-[22px]">
            {`${connection.sender.firstName} ${connection.sender.lastName}`}
          </div>
        </div>

        <div className="flex justify-center items-center gap-[10px]">
          <button className="text-[#0A66C2] font-semibold" onClick={()=>acceptConnection(connection._id)}>
            <IoCheckmarkCircleOutline className="w-[40px] h-[40px]" />
          </button>

          <button className="text-[#ff4218] font-semibold" onClick={()=>rejectConnection(connection._id)}>
            <RxCrossCircled className="w-[36px] h-[36px]" />
          </button>
        </div>
      </div>
    ))}
  </div>
)}

      




    </div>
  )
}
  

export default Network
