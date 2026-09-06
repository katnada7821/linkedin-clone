import Post from "../models/post.model.js"

export const createPost=async(req,res)=>{
   try{

    let {description}=req.body
    let newPost;
    if(!req.file){
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
    return res.status(201).json(`create post error ${error}`)

   }
}