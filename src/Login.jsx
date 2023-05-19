import React from "react";
import { useNavigate } from "react-router-dom";
const Login=()=>{
    const Navigate=useNavigate('');
    const NavigateHome=()=>{
        Navigate('/');
        alert('The login button is clicked...')
    }
    return (
    <>
    <div>Login Page</div>
    <button onClick={NavigateHome}>Navigate to Home Page</button>
    </>);
}
export default Login;