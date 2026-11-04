import express from "express"
import {search,getSuggestedUser, getCurrentUser, updateProfile,getprofile} from "../controllers/user.controllers.js"
import upload from "../middlewares/multer.js"
import isAuth from "../middlewares/isAuth.js"
let userRouter=express.Router()
userRouter.get("/currentuser",isAuth,getCurrentUser)
userRouter.get("/suggestedusers",isAuth,getSuggestedUser)
userRouter.put("/updateprofile",isAuth,upload.fields([
    {name:"profileImage",maxCount:1},
    {name:"coverImage",maxCount:1}
]),updateProfile)
userRouter.get("/profile/:userName",getprofile)
userRouter.get("/search",isAuth,search)



export default userRouter