import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "/images/default.jpeg" },
}, { timestamps: true })


const user = model("user", userSchema)

export default user;