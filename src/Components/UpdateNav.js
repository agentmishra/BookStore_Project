import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import '../css/header.css';
import { useAuthContext } from '../contexts/auth';

const UpdateNav = () => {
    const authcontext=useAuthContext();
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
    }
    if (!authcontext.user.id) {
        return (
            <>
                 <div >
                    <Link to='/login' style={LinkStyle}>Login</Link>
                    <span className='pipe'></span>
                    <Link to='/register' style={LinkStyle} >Register</Link>
                </div>  
            </>
        );
        
    }
    else {
        return(
        <>
                <div>
                    <Link to='/product' style={LinkStyle}>View Book</Link>
                    <span className='pipe'></span>
                    <Link to='/add-book' style={LinkStyle} >Add Book</Link>
                    <span className='pipe'></span>
                    <Link to='/bookList' style={LinkStyle}>Book List</Link>
                    <span className='pipe'></span>
                    <Link to='/user' style={LinkStyle}>User</Link>
                    <span className='pipe'></span>
                    <Link to='/update-profile' style={LinkStyle}>Update Profile</Link>
                    
                    </div>
                
                <Button style={logoutbtn} onClick={logoutEvent} variant='contained'>Logout</Button>
               
        </>

        );
            
    }
}
export default UpdateNav;