import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from '@mui/material/Button';
import Customer from "./Customer";
import LoginUI from "./LoginUI";
const Login = () => {
  const Navigate = useNavigate('');
  return (
    <>
      <div style={{ padding: 5 }}></div>
      <div>
        <div className="center ">
          <Button variant="text" onClick={() => Navigate('/')}>Home</Button>
          <span> | Login</span>
        </div>
        <div>
          <div className='center'>
            <h1 className="loginheader">Login or Create an Account</h1>
            <hr className="line" />
          </div>
        </div>
      </div>
        <div style={{margin:'auto',width:'70%'}}>
        <div className="side-by-side" >
          <div className="customer"><Customer /></div>
          <div className="loginpart"><LoginUI /></div>
        </div>
        </div>
      </>);
}
export default Login;