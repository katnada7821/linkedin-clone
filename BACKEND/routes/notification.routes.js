import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getNotifications } from "../controllers/notification.controllers.js"
import { deleteNotifications } from "../controllers/notification.controllers.js"
import { clearAllNotifications } from "../controllers/notification.controllers.js"
let notificationRouter=express.Router()
notificationRouter.get("/get",isAuth,getNotifications)
notificationRouter.delete("/delete/:id",isAuth,deleteNotifications)
notificationRouter.delete("/clear-all",isAuth,clearAllNotifications)
export default notificationRouter