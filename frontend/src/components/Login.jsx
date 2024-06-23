import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Login(){
    
    const nav = useNavigate()

    const [msg,setMsg] = useState();
    const [show, setShow] = useState(false);
    const [ldata, setlData] = useState({
        email: "",
        password: ""
    });

    function changeHandler(e) {
        const { name, value } = e.target;
        setlData(
            (prevVal) => {
                return {
                    ...prevVal,
                    [name]: value
                }
            }
        )
    }

    function handleClick() {
        setShow(
            (prevVal) => {
                return !prevVal;
            }
        )
    }
    Axios.defaults.withCredentials = true
    async function submitHandler(e) {
        e.preventDefault();
        //console.log(ldata)
        await Axios.post("http://localhost:5001/auth/login",ldata,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            if(res.data.status){
                nav('/dash')
                console.log(res.data.message)
            }
            else{
                setMsg(res.data.message)
            }
        }).catch(err=>console.log(err))
    }

    return (
        <div className="container bg-white h-50 w-50 mt-5 rounded p-2">
            {msg ? <div className="alert alert-danger" role="alert">
                {msg}
            </div> : ""}
            <h1 className='text-center'>login</h1>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="email" name="email" onChange={changeHandler} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label ">Password</label>
                    <input type={show ? "text" : "password"} className="form-control" id="password" name="password" onChange={changeHandler} required />
                    <br></br>
                    <span role='button' className="rounded border border-2 border-dark p-1" onClick={handleClick}>{show ? "hide" : "show"}</span>

                </div>
                <input type="submit" className="btn btn-primary text-center" />
            </form>
            <div className='mt-4 d-felx justify-content-center'> 
                <p>new user:<Link to="/signup">Signup</Link></p>
                <p>forgot password?:<Link to="/forgot-password">renew</Link></p>
            </div>
            <p className="text-center">go to main menu <Link to="/">Home</Link></p>
        </div>
    )
}

export default Login