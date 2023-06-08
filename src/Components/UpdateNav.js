import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

import '../css/header.css';
import { useAuthContext } from '../contexts/auth';
import { useCartContext } from '../contexts/cartContext';

const UpdateNav = () => {
    const authcontext=useAuthContext();
    const cartContext=useCartContext();
    const Navigate=useNavigate();
    const LinkStyle = {
        textDecoration: 'none',
        margin: '15px',
        color: '#f14d54'
    }
    const cart = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        textDecoration: 'none',
        border: '1px solid #ccc',
        borderRadius: '4px',
        color: 'black',
        width: '100.48px',
        height: '40px'
    }
    const logoutbtn={
        marginRight:'10px',
        marginTop:'4px'
    }
    const logoutEvent=()=>{
        authcontext.signOut();
        cartContext.emptyCart();
    }
    if (!authcontext.user.id) {
        return (
            <>
                 <div >
                    <Link to='/login' style={LinkStyle}>Login</Link>
                    <span className='pipe'></span>
                    <Link to='/register' style={LinkStyle} >Register</Link>
                </div>  
                <Link to='/cart' style={cart}>
                    <ShoppingCartIcon style={{ color: "#f14d54" }} />
                    <span style={{ color: "#f14d54" }}>{cartContext.cartData.length}</span>
                    Cart
                </Link>
        
            </>
        );
        
    }
    else {
        return(
        <>
                <div>
                    <Link to='/product' style={LinkStyle}>Book</Link>
                    <span className='pipe'></span>
                    <Link to='/user' style={LinkStyle}>User</Link>
                    <span className='pipe'></span>
                    <Link to='/update-profile' style={LinkStyle}>Update Profile</Link>
                </div>
                    <Link to='/cart' style={cart}>
                    <ShoppingCartIcon style={{ color: "#f14d54" }} />
                    <span style={{ color: "#f14d54" }}>{cartContext.cartData.length}</span>
                    Cart
                   </Link>
                <div style={{marginRight:'50px'}}></div>
                
                <Button style={logoutbtn} onClick={logoutEvent} variant='contained'>Logout</Button>
               
        </>

        );
            
    }
}
export default UpdateNav;