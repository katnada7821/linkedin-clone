import  { useContext,useEffect,useState } from 'react'
import { authDataContext } from './AuthDataContext'
import { userDataContext} from './UserDataContext'
import axios from "axios"
function UserContext({children}) {
let [userData,setUserData]=useState([null])
let {serverUrl}=useContext(authDataContext)
let[edit,setEdit]=useState(false)
let[postData,setPostData]=useState([])


useEffect(() => {
    const getCurrentUser = async () => {
        try {
            let result = await axios.get(
                serverUrl + "/api/user/currentuser",
                { withCredentials: true }
            )

            setUserData(result.data)

        } catch (error) {
            console.log(error)
            setUserData(null)
        }
    }

    const getPost= async () => {
        try {
            let result = await axios.get(
                serverUrl + "/api/post/getpost",
                { withCredentials: true }
            )

            
            console.log(result)
            setPostData(result.data)

        } catch (error) {
            console.log(error)
            
        }
    }

    

    getCurrentUser()
    getPost()
}, [serverUrl])
    const value={
        userData,setUserData,edit,setEdit,postData,setPostData
    }
  return (
    <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
      
    </div>
  )
}

export default UserContext
