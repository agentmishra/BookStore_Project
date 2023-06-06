import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { Formik } from 'formik';
import * as Yup from "yup";
import { loginContext } from '../contexts/LoginContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { useAuthContext } from '../contexts/auth';
const LoginUI = () => {
  const authContext = useAuthContext();
  const { login, setLogin } = useContext(loginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const Navigate = useNavigate('');
  const initialValues = {
    "email": '',
    "password": ''
  }
  const validationSchema = Yup.object().shape({
    "email": Yup.string().email("Please Enter Valid Email").required("Please Enter Email"),
    "password": Yup.string().min(8, "Password Must be a 8 Characters Long").matches(/[a-zA-Z]/, 'Password Contains atleast one character').required("Please Enter Password")
  });
  const onFormSubmit = async (values) => {
    const getData = {
      'email': values.email,
      'password': values.password
    }
    console.log("On Login Data:", values)
    const res = await axios.post('https://book-e-sell-node-api.vercel.app/api/user/login', getData);
    if (res.status === 200) {
      console.log(res.data.result);
      delete res.data.result._id;
      delete res.data.result.__v;
      toast.success('Login Successfully');
      console.log(res.data.result);
      authContext.setUser(res.data.result);
      setLogin(true);
      Navigate('/booklist');
    }
  };

  const NavigateHome = () => {
    Navigate('/');
    // alert('The login button is clicked...')
    console.log("Email:", email);
    console.log("Password", password);
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

      <div style={{ fontSize: '20px', color: '#414141', fontWeight: 'bold' }}>Registered Customers</div>
      <hr />
      <div style={{ marginBottom: 10 }}></div>
      <p className='paraStyle'>If you have an account with us,Please log in.</p>
      <div style={{ marginBottom: 10 }}></div>

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
              <Button variant="contained" type="submit" disabled={isSubmitting} sx={{ width: 100 }}>Login</Button>
            </form>
          );
        }
        }
      </Formik>


    </>
  );
}
export default LoginUI;