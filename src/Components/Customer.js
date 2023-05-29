import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
const Customer=()=>{
    const Navigate = useNavigate('');
    return(<>
    <div style={{fontSize:'20px',color:'#414141',fontWeight:'bold'}}>New Customer</div>
    <hr />
    <div style={{marginBottom:10, width:'500px'}}></div>
    <p className='paraStyle'>Registration free and easy.</p>
    <div style={{marginBottom:10}}></div>
    <ul  style={{fontSize:'15px',color:'#212121'}}>
        <li style={{paddingBottom:'15px'}}>Faster Checkout</li>
        <li style={{paddingBottom:'15px'}}>Save Multiple Shipping Addresses</li>
        <li style={{paddingBottom:'15px'}}>View and Track Orders and move</li>
    </ul>
    <div style={{marginBottom:'130px'}}></div>
    <Button variant="contained" type="submit" sx={{height:'40px'}} onClick={()=>Navigate('/register')}>Create an Account</Button>
    </>
    );
}
export default Customer;