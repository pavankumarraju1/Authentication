import 'dotenv/config'

import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors"

import connection from './connection.js';
import userRouter from './routes/userRoutes.js';

const app = express()
const PORT = process.env.port
connection()

app.use(cors({
    origin:["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use('/auth',userRouter)

 
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})