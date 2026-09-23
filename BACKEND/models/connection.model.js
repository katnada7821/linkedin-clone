import mongoose from "mongoose"

const connectionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
}, { timestamps: true })

const Connection = mongoose.model("Connection", connectionSchema)

export default Connection