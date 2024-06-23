import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function DashBoard() {
    const nav = useNavigate()
    
    function handleClick(){
        axios.get("http://localhost:5001/auth/logout").then((res)=>{
            if(res.data.status){
                nav('/')
            }
            else{
                alert("Error Occured")
            }
        }).catch(err=>{
            console.log(err)
        })
    }
        useEffect(() => {
            axios.get("http://localhost:5001/auth/verify").then((res) => {
                if (res.data.status) {
                    console.log(res.data.message)
                }
                else {
                    nav('/')
                }
            })
        }, [])
    
  return (
    <div>
    <h1>dashboard</h1>
          <button className='btn btn-primary m-3'><Link className='text-secondary text-dark' to="/profile">secrets</Link></button>
          <button className='btn btn-primary' onClick={handleClick}>logout</button>
    </div>
  )
}

export default DashBoard