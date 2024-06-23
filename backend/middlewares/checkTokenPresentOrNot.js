import asyncHandler from "express-async-handler"


const checkToken = asyncHandler(async (req,res,next)=>{
    const token = req.cookies.token;
    //console.log(token)
    if(!token){
        return res.json({status:false})
    }
    else{
        next()
    }
})

export default checkToken;