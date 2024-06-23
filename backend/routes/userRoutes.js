import express from "express";
import { loginController, signupController, forgotPasswordController, resetPasswordController, verifyToken, logoutController, getData } from "../controller/user.js";
import checkToken from "../middlewares/checkTokenPresentOrNot.js";



const userRouter = express.Router()
 

userRouter.post('/signup',signupController)
userRouter.post('/login',loginController)
userRouter.post('/forgotPassword', forgotPasswordController)
userRouter.post('/resetPassword/:token',resetPasswordController)
userRouter.get('/verify',checkToken,verifyToken)
userRouter.get('/logout',logoutController)
userRouter.get('/getData',getData)


export default userRouter