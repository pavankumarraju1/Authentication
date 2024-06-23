import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card';

function UserProfiles() {
  axios.defaults.withCredentials = true;
  const [data,setData] = useState([]);
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
    axios.get("http://localhost:5001/auth/getData").then((res) => {
      if (res.data.status) {
        setData(res.data.details)
        console.log(res.data.details)
      }
      else {
        console.log("error occurres")
      }
    }).catch(err => console.log(err))

  },[])

  return (
    <div>
        <h1 className='text-center mb-5'>secret data of all user profiles</h1>
        <div className='d-flex justify-content-center gap-5 flex-wrap p-5'>
        {
          data.map(
            (val,idx) => {
              return (<Card key={idx} name={val.username} email={val.email} url={val.profileImage} />)
            }
          )
        }
        </div>
    </div>
  )
}

export default UserProfiles