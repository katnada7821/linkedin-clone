import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
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
                ref: "user"
            }
        }
    ],

    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
}, { timestamps: true })

const Post = mongoose.model("post", postSchema)

export default Post