import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function ResetPassword() {

    const [password, setPass] = useState();
    const[show,setShow] = useState(false)

    const {token} = useParams()
    const nav = useNavigate(); 

    function handleClick(){
        setShow((prevVal)=>{
            return !prevVal 
        })
    }

    function submitHandler(e) {
        e.preventDefault()
        console.log(password)
        Axios.post(`http://localhost:5001/auth/resetPassword/${token}`,{password},{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            if(res.data.status){
                alert(res.data.message)
                nav('/login')
            }
            else{
                alert(res.data.message)
            }
        }).catch((err)=>console.log(err))
    }
    return (
        <div className="container bg-white h-50 w-50 mt-5 rounded p-2">
            <h1 className='text-center mb-5'>reset password</h1>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter new password:</label>
                    <input type={show?"text":"password"} className="form-control" id="password" aria-describedby="password" name="password" onChange={(e) => {
                        setPass(e.target.value)
                    }} required />
                </div>
                <div role='button' onClick={handleClick}> <span className='border border-dark p-1 rounded btn btn-secondary'>{show ? "hide" : "show"}</span></div>
                <input type="submit" className="btn btn-primary mt-3" />
            </form>
        </div>
    )

}

export default ResetPassword;