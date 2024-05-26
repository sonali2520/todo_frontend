/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Link,Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Register(props) {

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {isAuthenticated,setisAuthenticated,loading,setLoading}=useContext(Context);

    const submitHandler=async(e)=>{
        e.preventDefault();
        try {
            const {data} =await axios.post(`${server}/users/new`,{
                name,
                email,
                password
            },
            {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            }
           );
              toast.success(data.message);
              setisAuthenticated(true);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
            setisAuthenticated(false);
        }
    }
    
    if(isAuthenticated) return <Navigate to={"/"}/>

    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                     <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Name' required/>
                     <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email" required/>
                     <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" required/>
                     <button type="submit" disabled={loading}>Sign Up</button>
                     <h4>Or</h4>
                     <Link to={"/login"}>Login</Link>
                </form>
            </section>
        </div>
    )
}
