/* eslint-disable no-unused-vars */
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";

function App() {

  const {user,setUser,setisAuthenticated,setLoading,ref,setRef}=useContext(Context);

  useEffect(()=>{
    setLoading(true);
    axios.get(`${server}/users/me`,{
      withCredentials:true
    }).then(res=>{
      console.log(res.data.user);
      setUser(res.data.user);
      setisAuthenticated(true);
      setLoading(false);
    }).catch((error)=>{
        setUser({});
        setisAuthenticated(false);
        setLoading(false);
    })
  },[])

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Toaster/>
      </Router>
  );
}

export default App
