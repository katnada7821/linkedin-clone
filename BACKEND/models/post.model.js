import mongoose from "mongoose"

const postSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    image: {
        type: String
    },

    Comment: [
        {
            content: {
                type: String
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],

    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

}, { timestamps: true })

const Post = mongoose.model("post", postSchema)

export default Post