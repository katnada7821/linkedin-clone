import Notification from "../models/notification.model.js"

export const getNotifications=async(req,res)=>{
    try{
        let notifications=await Notification.find({receiver:req.userId}).populate("relatedUser","firstName lastName userName profileImage").populate("relatedPost","image description").sort({createdAt:-1})
        return res.status(200).json(notifications)
    }catch(error){
        console.log(error)
        return res.status(500).json({message:`get notifications error`})
    }
}

export const deleteNotifications=async(req,res)=>{
    try{
        let {id}=req.params
        await Notification.findByIdAndDelete({
_id:id,
receiver:req.userId
        })
        return res.status(200).json({message:"notification deleted successfully"})
    }
        
    catch(error){
        console.log(error)
        return res.status(500).json({message:`get notifications error`})
    }
}
export const clearAllNotifications=async(req,res)=>{
    try{
        let {id}=req.params
        await Notification.deleteMany({

receiver:req.userId
        })
        return res.status(200).json({message:"all notifications cleared successfully"})
    }
        
    catch(error){
        console.log(error)
        return res.status(500).json({message:`get notifications error`})
    }
}

