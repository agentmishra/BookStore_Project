import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import { Popover } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { Formik } from 'formik';
import * as Yup from "yup";

const Login = () => {
  const [name, setName] = useState("Dhruv Patel");
  const [email, setEmail] = useState("dp@gmail.com");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const Navigate = useNavigate('');
  const initialValues = {
    "name": '',
    "email": ''
  }
  const validationSchema=Yup.object().shape({
    "name":Yup.string().min(3,"Please Make Sure you have Entered your name Atleast 3 characters long..."),
    "email":Yup.string().email("Please Enter Valid Email")
  });

  // useEffect(() => {
  //   console.log("The New value Is:", name);
  //   return () => {
  //     console.log("The Old Value Is:", name);
  //   }
  // }, [name])
  const onFormSubmit = (values,{setSubmitting}) => {
    
   console.log("On Form Submit:",values);
   setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);  
   alert("Form Submitted Successfully....")
  }
  const NavigateHome = () => {
    Navigate('/');
    // alert('The login button is clicked...')
    console.log("Name:", name);
    console.log("Email:", email);
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
      <div style={{ padding: 5 }}></div>
      <div style={{
        padding: 5
      }}>
        <div style={{
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
        </Popover>
      </div>
      <div style={{
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 10
      }}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onFormSubmit}>
          {({ value, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
            return(
            <form onSubmit={handleSubmit}>
            <div style={{
              display:"flex",
              flexDirection:'column',
              marginBottom:5,
              rowGap:10
            }}>
              <TextField
                type='text'
                placeholder="Name"
                label="Name"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                 />
                  {errors.name && touched.name && <span style={{
                  color:'red',
                  fontSize:15,
                  marginBottom:5
                }}>{errors.name}</span>}
              <TextField
                type='email'
                placeholder='Email'
                onChange={handleChange}
                label="Email"
                name="email"
                onBlur={handleBlur}
                 />
                {errors.email && touched.email && <span style={{
                  color:'red',
                  fontSize:15,
                  marginBottom:5
                }}>{errors.email}</span>}
              <Button variant="contained" type="submit" disabled={isSubmitting}>SUBMIT</Button>
              </div>
            </form>
            );
          }
          }
        </Formik>

      </div>
    </>);
}
export default Login;