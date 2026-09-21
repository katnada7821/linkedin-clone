import express from "express"
import {acceptConnection, getConnectionRequests, getConnectionStatus, getUserConnections, rejectConnection, removeConnection, sendConnection} from "../controllers/connection.controllers.js"
import isAuth from "../middlewares/isAuth.js"
let connectionRouter=express.Router()
connectionRouter.get("/send",isAuth,sendConnection)
connectionRouter.get("/accept/:connectionId",isAuth,acceptConnection)
connectionRouter.get("/reject/:connectionId",isAuth,rejectConnection)
connectionRouter.get("/getstatus/:userId",isAuth,getConnectionStatus)
connectionRouter.get("/remove/:userId",isAuth,removeConnection)
connectionRouter.get("/request",isAuth,getConnectionRequests)
connectionRouter.get("/",isAuth,getUserConnections)


export default connectionRouter