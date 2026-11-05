import mongoose from "mongoose"
const notificationSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  relatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  type: {
    type: String,
    enum: ["like", "comment", "connection"]
  },
  relatedPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  }
}, { timestamps: true })

const Notification = mongoose.model("Notification", notificationSchema)

export default Notification