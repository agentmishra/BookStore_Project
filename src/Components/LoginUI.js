import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import { Popover } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { Formik } from 'formik';
import * as Yup from "yup";
import authService from '../service/auth.service';
import { toast } from 'react-toastify';
const LoginUI = () => {
 
  const [email, setEmail] = useState("");
  const[password,setPassword]=useState('');
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const Navigate = useNavigate('');
  const initialValues = {
    "email": '',
    "password": ''
  }
  const validationSchema = Yup.object().shape({
    "email": Yup.string().email("Please Enter Valid Email").required("Please Enter Email"),
    "password": Yup.string().min(8,"Password Must be a 8 Characters Long").matches(/[a-zA-Z]/,'Password Contains atleast one character').required("Please Enter Password")
  });
  const onFormSubmit = (values, { setSubmitting }) => {
    authService.login(values).then((res)=>{
      delete res._id;
      delete res._v;
      // authContext.setUser(res);
      Navigate('/');
      toast.success("Successfully Logged in...")
    });
    Navigate('/');
  }
  const NavigateHome = () => {
    Navigate('/');
    // alert('The login button is clicked...')
    console.log("Email:", email);
    console.log("Password",password);
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
     
      <div style={{ fontSize: '20px', color: '#414141',fontWeight:'bold'}}>Registered Customers</div>
      <hr />
      <div style={{ marginBottom: 10 }}></div>
      <p className='paraStyle'>If you have an account with us,Please log in.</p>
      <div style={{ marginBottom: 10 }}></div>
      {/* <div style={{
        padding: 5,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
        onClick={handleClick}>
        <Avatar sx={{ bgcolor: 'blue' }}>DP</Avatar>
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
        <LogoutIcon onClick={NavigateHome} />
      </Popover> */}


      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onFormSubmit}>
        {({ value, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div style={{
                display: "flex",
                flexDirection: 'column',
                marginBottom: 5,
                rowGap: 10
              }}>
                <div>
                  <div className='label'>Email Address* </div>
                  <TextField
                    type='email'
                    placeholder='Email'
                    style={{ width: '500px' }}
                    onChange={handleChange}
                    name="email"
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && <div style={{
                    color: 'red',
                    fontSize: 15,
                    marginBottom: 5
                  }}>{errors.email}</div>}
                </div>
                <div>
                  <div className='label'>Password*</div>
                  <TextField
                    type='password'
                    placeholder='Password'
                    style={{ width: '500px' }}
                    onChange={handleChange}
                    name="password"
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && <div style={{
                    color: 'red',
                    fontSize: 15,
                    marginBottom: 5
                  }}>{errors.password}</div>}
                </div>
              </div>
              <div style={{ marginBottom: '60px' }}></div>
              <Button variant="contained" type="submit" disabled={isSubmitting} sx={{width:100}}>Login</Button>
            </form>
          );
        }
        }
      </Formik>


    </>
  );
}
export default LoginUI;