import mongoose from "mongoose";

async function connection(){
    try {
        await mongoose.connect(process.env.mongo_url)
        console.log("connected to db")
    } catch (error) {
        console.log("error in conn",error)
    }
  
}


export default connection;