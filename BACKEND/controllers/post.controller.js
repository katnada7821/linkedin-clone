import Post from "../models/post.model.js"
import uploadOnCloudinary from "../config/cloudinary.js"

export const createPost=async(req,res)=>{
   try{

    let {description}=req.body
    let newPost;
    if(req.file){
        let image=await uploadOnCloudinary(req.file.path)
        newPost=await Post.create({
            author:req.userId,
            description,
            image
        })
    }else{
         newPost=await Post.create({
            author:req.userId,
            description
            
        })
    }
    return res.status(201).json(newPost)

   } catch (error){
    return res.status(500).json(`create post error ${error}`)

   }
}
export const getPost= async(req,res)=>{
    try{
        const post=await Post.find().populate("author","firstName lastName profileImage headline")
        .sort({createdAt:-1})
        return res.status(200).json(post)

    }catch(error){
    console.log("GET POST ERROR:", error)
    return res.status(500).json({
        message: "getPost error",
        error: error.message
    })
}

}