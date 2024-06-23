import asyncHandler from "express-async-handler"
import user from "../model/User.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"

import { createToken, validateToken } from "../middlewares/tokenCreateValidate.js";

const rounds = 10;

const signupController = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;
    const existUser = await user.findOne({email})
    if(existUser){
        return res.json({status:false,message:"user alredy found"})
    }
    bcrypt.hash(password,rounds,async(err,hash)=>{
        if(err){
            return res.json({status:false,message:"something went wrong"})
        }
        await user.create({
            username,
            email,
            password:hash,
        })
        return res.json({status:true,message:"registered successfully"})
    })
})


const loginController = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const userData = await user.findOne({email})
    //console.log(userData)
    if(!userData){
        return res.json({status:false,message:"user details not found"})
    }
    bcrypt.compare(password,userData.password,(err,result)=>{
        if(err){
            return res.json({status:false,message:"something went wrong in hashing"})
        }
        if(result){
            const Token = createToken(userData)
            res.cookie("token",Token,{httpOnly:true})
            return res.json({status:true,message:"logged in successfully"})
        }
        else{
            return res.json({status:false,message:"password is incorrect"})
        }
    })
}) 

const forgotPasswordController = asyncHandler(async(req, res) => {
    const { email } = req.body;
    //console.log(email)
    const userdetails = await user.findOne({email})
    if(!userdetails){
        res.json({status:false,message:"email not found"})
    }
    const token = createToken(userdetails);  
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '999pavankumarraju@gmail.com',
            pass: 'owskrsafilfdqvxh'
        }
    });

    var mailOptions = {
        from: '999pavankumarraju@gmail.com',
        to: email,
        subject: 'reset password',
        text:`http://localhost:5173/reset-password/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.json({status:false,message:"error in sending email"})
        } else {
            res.json({status:true,message:"mail sent successfully"})
        }
    });

})

const resetPasswordController = asyncHandler(async(req, res) => {
    const {password} = req.body;
    const token = req.params.token;
    const userdetails = validateToken(token); 
    const hashPass = await bcrypt.hash(password,rounds); 
    const id = userdetails._id;
    const update = await user.findByIdAndUpdate({_id:id},{password:hashPass})
    if(update){
        res.json({status:true,message:"password updated successfully"})
    }
    else{
        res.json({status:false,message:"password not updated"})
    }
})

const verifyToken = asyncHandler((req,res) => {
    return res.json({status:true,message:"authorized user"})
})
 
const logoutController = (req,res)=>{
    res.clearCookie("token");
    return res.json({status:true})
}

const getData = asyncHandler(async (req, res) => {
    const userData = await user.find({});
    //console.log(userData)
    if(!userData){
        return res.json({status:false,message:"no data found"})
    }
    else{
        return res.json({status:true,details:userData})
    }
})

export {
    signupController,
    loginController,
    forgotPasswordController,
    resetPasswordController,
    verifyToken,
    logoutController,
    getData
}