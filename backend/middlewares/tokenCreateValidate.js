import jwt from "jsonwebtoken"

function createToken(user){
    const data = {
        _id : user._id,
        username : user.username,
        email : user.email,
        password : user.password
    }
    const token = jwt.sign(data,process.env.secretkey,{
        expiresIn:"1h"
    })
    return token;
}

function validateToken(token) {
    const data = jwt.verify(token,process.env.secretkey)
    return data
}

export {
    createToken,
    validateToken
}