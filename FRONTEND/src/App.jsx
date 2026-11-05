import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Notification from "./pages/Notification"
import { useContext } from "react"
import { userDataContext } from "./assets/context/UserDataContext"
import Network from "./pages/Network"
import Profile from "./pages/Profile"


function App() {

  let { userData } = useContext(userDataContext)
  return (
    <Routes>
      <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path="/signup" element={userData ? <Navigate to="/" /> : <Signup />} />
      <Route path="/login" element={userData ? <Navigate to="/" /> : <Login />} />
      <Route path="/network" element={userData ? <Network /> : <Navigate to="/login" />} />
      <Route path="/" element={<Home />} />
  <Route path="/home" element={<Home />} />
      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to="/login" />}
      />
      <Route path="/notification" element={userData ? <Notification /> : <Navigate to="/login" />} />


      <Route
        path="/user/:userName"
        element={userData ? <Profile /> : <Navigate to="/login" />}
      />
      
    </Routes>
  )
}

export default App