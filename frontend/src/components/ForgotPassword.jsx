import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
function ForgotPassword() {
    const [email, setmail] = useState("");
    const [msg, setMsg] = useState()

    const nav = useNavigate()
    async function submitHandler(e) {
        e.preventDefault()
        console.log(email)
        await Axios.post("http://localhost:5001/auth/forgotPassword", {email},{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.data.status) {
                alert("link has sent to your email adress")
                nav('/login')
            }
            else {
                setMsg(res.data.message)
            }
        }).catch((err) => console.log(err))
    }
    return (
        <div className="container bg-white h-50 w-50 mt-5 rounded p-2">
            {msg ? <div className="alert alert-danger" role="alert">
                {msg}
            </div> : ""}
            <h1 className='text-center'>forgot password</h1>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="email" name="email" onChange={(e) => {
                        setmail(e.target.value)
                    }} required />
                </div>
                <input type="submit" className="btn btn-primary" />
            </form>
            <p className="mt-4">go to login: <Link to="/login">login</Link></p>
            <p className="text-center">go to main menu <Link to="/">Home</Link></p>
        </div>

    )
}

export default ForgotPassword