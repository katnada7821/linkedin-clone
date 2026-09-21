import User from "../models/user.model.js"

export const sendConnection=async(req,res)=>{
    try{
        let{id}=req.params
        let sender=req.userId
        let user=await User.findById(sender)

        if(sender==id){
            return res.status(400).json({message:"you can not send request yourself"})
        }

        if(user.connection.includes(id)){
            return res.status(400).json({message:"you are already connected"})
        }
        let existingConnection=await Connection.findOne({
            sender,
            receiver:id,
            status:"pending"
        })
        if(existingConnection){
            return res.status(400).json({message:"request already exist"})
        }

        let newRequest=await Connection.create({
            sender,
            receiver:id

        })
        return res.status(200).json(newRequest)
    } catch(error){
        return res.status(500).json({message:`sendconnection error ${error}`})

    }
}

export const acceptConnection=async(req,res)=>{
   try{
    let {connectionId}=req.params
    let connection=await Connection.findById(connectionId)
    if(!connection){
        return res.status(400).json({message:"connection does not exist"})
    }
    if(connection.status!="pending"){
        return res.status(400).json({message:"request under process"})
    }
    connection.status="accepted"
    await connection.save()
    await User.findByIdAndUpdate(req.userId,{
        $addToSet:{connection:connection.sender._id}
    })
    await User.findByIdAndUpdate(connection.sender._id,{
        $addToSet:{connection:req.userId}
    })
    return res.status(200).json({message:"connection accepted"})

   }catch(error){
    return res.status(500).json({message:`connection accepted error ${error}`})

   }
}

export const rejectConnection=async(req,res)=>{
   try{
    let {connectionId}=req.params
    let connection=await Connection.findById(connectionId)
    if(!connection){
        return res.status(400).json({message:"connection does not exist"})
    }
    if(connection.status!="pending"){
        return res.status(400).json({message:"request under process"})
    }
    connection.status="rejected"
    await connection.save()
    
    return res.status(200).json({message:"connection rejected"})

   }catch(error){
    return res.status(500).json({message:`connection rejected error ${error}`})

   }
}

export const getConnectionStatus = async (req, res) => {
    try {
        const targetUserId = req.params.userId;
        const currentUserId = req.userId;

        let currentUser = await User.findById(currentUserId);

        if (currentUser.connection.includes(targetUserId)) {
            return res.json({ status: "disconnect" });
        }

        const pendingRequest = await Connection.findOne({
            $or: [
                {
                    sender: currentUserId,
                    receiver: targetUserId
                },
                {
                    sender: targetUserId,
                    receiver: currentUserId
                }
            ],
            status: "pending"
        });

        if (pendingRequest) {
            if (
                pendingRequest.sender.toString() ===
                currentUserId.toString()
            ) {
                return res.json({ status: "pending" });
            } else {
                return res.json({
                    status: "received",
                    requestId: pendingRequest._id
                });
            }
        }

        // if no connection or pending req found
        return res.json({ status: "Connect" });

    } catch (error) {
        return res.status(500).json({
            message: "getConnectionStatus error"
        });
    }
};
export const removeConnection = async (req, res) => {
    try {
        const myId = req.userId;
        const otherUserId = req.params.userId;

        await User.findByIdAndUpdate(myId, {
            $pull: {
                connection: otherUserId
            }
        });

        await User.findByIdAndUpdate(otherUserId, {
            $pull: {
                connection: myId
            }
        });

        return res.json({
            message: "Connection removed successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "removeConnection error"
        });
    }
};
export const getConnectionRequests = async (req, res) => {
    try {
        const userId = req.userId;

        const requests = await Connection.find({
            receiver: userId,
            status: "pending"
        }).populate(
            "Sender",
            "firstName lastName email userName profileImage headline"
        );

        return res.status(200).json(requests);

    } catch (error) {
        console.error(
            "Error in getConnectionRequests controller:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};
export const getUserConnections = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).populate(
            "connection",
            "firstName lastName userName profileImage headline connection"
        );

        return res.status(200).json(user.connection);

    } catch (error) {
        console.error(
            "Error in getUserConnections controller:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};