import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Signup() {

    const nav = useNavigate();
    const [data,setData] = useState({
        username:'',
        email:'',
        password:''
    })
    const[show,setShow] = useState(false)
    const[msg,setMsg] = useState()

    function changeHandler(e){
        const {name,value} = e.target
        setData((prevVal)=>{
            return{
                ...prevVal,
                [name]:value
            }
        })
    }

    function handleClick(){
        setShow((prevVal)=>{
            return !prevVal
        })
    }

    async function submitHandler(e){
        e.preventDefault();
        //console.log(data)
        await Axios.post("http://localhost:5001/auth/signup",data,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            if(res.data.status){
                console.log(res.data.message)
                nav('/login')
            }
            else{
                setMsg(res.data.message)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
      <div className="container bg-white h-50 w-50 mt-5 rounded p-2">
          {msg ? <div className="alert alert-danger" role="alert">
              {msg}
          </div>: ""}
          <h1 className="text-center">signup</h1>
          <form onSubmit={submitHandler}>
              <div className="mb-3">
                  <label htmlFor="username" className="form-label">user name</label>
                  <input type="text" className="form-control" id="username" aria-describedby="username" name="username" onChange={changeHandler} required />
              </div>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" aria-describedby="email" name="email" onChange={changeHandler} required />
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type={show ? "text" : "password"} className="form-control" id="password" name="password" required onChange={changeHandler} />
                  <br></br>
                  <span className="rounded border border-2 border-dark p-1" role='button' onClick={handleClick}>{show ? "hide" : "show"}</span>
              </div>
              {/* <div className="mb-3">
                  <label htmlFor="profileImage" className="form-label">profile image</label>
                  <input type="file" accept="image/*" className="form-control" id="profileImage" name="profileImage" onChange={(e) => setImage(e.target.files[0])} />
              </div> */}

              <button type="submit" className="btn btn-primary"> submit</button>
          </form>
          <p className="mt-3">Already a user?? <Link to="/login">login</Link></p>
          <p className="text-center">go to main menu <Link to="/">Home</Link></p>
      </div>
  )
}

export default Signup