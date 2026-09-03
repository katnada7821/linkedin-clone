import { useState } from "react"
import logo from "../assets/logo.svg"
import {useNavigate} from "react-router-dom"
import { useContext } from "react"
import { authDataContext } from "../assets/context/AuthDataContext"
import axios from "axios"
import { userDataContext } from "../assets/context/UserDataContext"

function Login() {
  let [show,setShow]=useState(false)
  let {serverUrl}=useContext(authDataContext)
  let {setUserData}=useContext(userDataContext)
  let navigate=useNavigate()
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [loading,setLoading]=useState(false)
  let[err,setErr]=useState("")
  

  const handleSignIn=async(e)=>{
    e.preventDefault()

    try{
      let result= await axios.post(serverUrl+"/api/auth/login",{     
      email,
      password
      },{withCredentials:true})
      console.log(result)
      setUserData(result.data)
      navigate("/")
      setErr("")
      setLoading(false)     
      setEmail("")
      setPassword("")
    }catch(error){

setLoading(false)
setErr(error.response.data.message)

    }
  }

  return (
    <div className="w-full h-screen bg-[white] flex flex-col items-center justify-start gap-[10px]" >
      <div className="p-[30px] lg:p-[35px] w-full h[80px] flex items-center">
        <img src={logo} alt="" />
      </div>
      <form className="w-[90%] max-w-[400px] h-[600px] focus:outline-[#0A66C2] md:shadow-xl flex flex-col justify-center gap-[20px] p-[15px]" onSubmit={handleSignIn}>
        <h1 className="text-gray-800 text-[30px] font-semibold">Sign in</h1>
        
        <input type="email" placeholder='email' required className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md focus:outline-[#0A66C2]"value={email} onChange={(e)=>setEmail(e.target.value)} />
        <div className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] rounded-md relative">
          <input type={show?"text":"password"} placeholder='password' required className="w-full h-full border-none text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md focus:outline-[#0A66C2]" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <span className="absolute right-[20px] top-[10px] text-[#0A66C2] cursor-pointer font-semibold" onClick={()=>setShow(prev=>!prev)}>{show?"hidden":"show"}</span>
        </div>
        {err&&<p className="text-center text-red-500">
          "{err}"
          </p>}
        <button className="w-[100%] h-[50px] rounded-full bg-[#0A66C2] mt-[30px] text-white" disabled={loading}>{loading?"loading..":"sign in"}</button>
        <p className="text-center cursor-pointer" onClick={()=>navigate("/signup")}>want to create an new account? <span className="text-[#0A66C2]" > Sign up</span></p>
        

      </form>
    </div>
  )
}

export default Login
