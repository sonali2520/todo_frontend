/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

function Header(props) {
    
    const {isAuthenticated,setisAuthenticated,loading,setLoading,setRefresh}=useContext(Context);

    
    const submitHandler=async (e)=>{
        setLoading(true);
        try {
           await axios.get(`${server}/users/logout`,
            {
              withCredentials:true,
            }
           );
           toast.success("Logged out successfully");
           setisAuthenticated(false);
           setLoading(false);
        } catch (error) {
           toast.error(error.response.data.message);
           setisAuthenticated(true);
           setLoading(false);
        }
   }

  

    return (
        <>
          <nav className='header'>
            <div>
                <h2>Todo App</h2>
            </div>
            <article>
                <Link to={"/"}>Home</Link>
                {
                    isAuthenticated ? (<button className='btn' disabled={loading} onClick={submitHandler}>Logout</button>) : (<Link to={"/login"}>Login</Link>)
                }
            </article>
          </nav>  
        </>
    )
}

export default Header;
