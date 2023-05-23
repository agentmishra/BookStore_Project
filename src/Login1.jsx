import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import {Avatar} from "@mui/material";
import {Popover} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout'; 

const Login=()=>{
    const[name,setName]=useState("Dhruv Patel");
    const[email,setEmail]=useState("dp@gmail.com");
    const[open,setOpen]=useState(false);
    const [anchorEl, setAnchorEl] =useState(null);
    const Navigate=useNavigate('');

    useEffect(()=>{
        console.log("The New value Is:",name);
        return ()=>{
          console.log("The Old Value Is:",name);
        }
    },[name])
    const NavigateHome=()=>{
        Navigate('/');
        // alert('The login button is clicked...')
        console.log("Name:",name);
        console.log("Email:",email);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
      };
    return (
    <>
    <div style={{padding:5}}></div>
    <div style={{
        padding:5
    }}>
    <div style={{
        padding:5,
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center'
    }}
    onClick={handleClick}>
    <Avatar sx={{ bgcolor:'blue'}}>DP</Avatar>
    <span>Dhruv Patel</span>
    </div>
    <Popover 
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
    transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
>
<Button variant="contained" onClick={NavigateHome}>LOGOUT</Button>
<LogoutIcon onClick={NavigateHome}/>
</Popover>
    </div>
    <div style={{
        padding:5,
        display:'flex',
        flexDirection:'column',
        rowGap:10
    }}>
    <TextField
     type='text'
     placeholder="Name" 
     label="Name"
     onChange={(e)=>setName(e.target.value)} 
     value={name} />
    <TextField 
    type='email' 
    placeholder='Email' 
    onChange={(e)=>setEmail(e.target.value)}
    label="Email" 
    value={email}/>
    <Button variant="contained" onClick={NavigateHome}>SUBMIT</Button>
    </div>
    </>);
}
export default Login;