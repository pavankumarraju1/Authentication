import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function UserProfiles() {
  axios.defaults.withCredentials = true;
  const nav = useNavigate();
  useEffect(()=>{
    axios.get("http://localhost:5001/auth/verify").then((res)=>{
      if(res.data.status){
        console.log(res.data.message)
      }
      else{
        nav('/')
      }
    })
  },[])
  return (
    <div>
        <h1>secret data of all user profiles</h1>
    </div>
  )
}

export default UserProfiles