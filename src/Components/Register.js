import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import { Popover } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Formik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import '../css/myStyle.css'
const Register = () => {
    const [name, setName] = useState("Dhruv Patel");
    const [email, setEmail] = useState("dp@gmail.com");
    const [role,setRole]=useState('');
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const Navigate = useNavigate('');
    const initialValues = {
        "firstName": '',
        "lastName": '',
        "email": '',
        "password": '',
        "confirmPd": ''
    }
    const validationSchema = Yup.object().shape({
        "firstName": Yup.string().min(3, "First Name Must be 3 characters long...").required("Please Enter Your First Name"),
        "lastName": Yup.string().min(3, "Last Name must be 3 characters long...").required('Please Enter Your Last Name'),
        "email": Yup.string().email("Please Enter Valid Email").required('please Enter your Email ID'),
        "password":Yup.string().min(8,"Password Must be 8 Characters Long...").required('Please Enter Your Password'),
        "confirmPd":Yup.string().required('Please Enter Confirm Password').oneOf([Yup.ref('password'), null], 'Passwords must match'),
   
    });

    
    const onFormSubmit = (values, { setSubmitting }) => {
        const requestData={
            "firstName":values.firstName,
            "lastName":values.lastName,
            "email":values.email,
            "password":values.password,
            "confirmPd":values.confirmPd
        }
    console.log(values);
        console.log("On Form Submit:", values);
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
        alert("Form Submitted Successfully....");
        axios.post("https://jsonplaceholder.typicode.com/posts",requestData);
        
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
            <div>
                <div className="center">
                    <Button variant="text" onClick={()=>Navigate('/')}>Home</Button>
                    <span> | Create an Account</span>
                </div>
                <div>
                    <div className='center'>
                        <h1>Login or Create An Account</h1>
                        <hr className="line"/>
                    </div>

                </div>
                <div style={{
                    width:'50%',
                    margin:'auto',
                }}>
                    <h3>Personal Information</h3>
                    <hr/>
                    <p>Please Enter the following information to create Your Account</p>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onFormSubmit}>
                            {({ value, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
                                return (
                                    <form onSubmit={handleSubmit} >
                                        <div className='side-by-side'>
                                           <div>
                                            <div>First Name* </div>
                                            <TextField
                                                type='text'
                                                placeholder="FirstName"
                                                name="firstName"
                                                style={{width:'355px'}}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {errors.firstName && touched.firstName && <div style={{
                                                color: 'red',
                                                fontSize: 15,
                                                marginBottom: 5
                                            }}>{errors.firstName}</div>}
                                            </div> 
                                            <div >
                                            <div>Last Name* </div>
                                            <TextField
                                                type='text'
                                                placeholder="LastName"
                                                name="lastName"
                                                style={{width:'355px'}}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {errors.lastName && touched.lastName && <div style={{
                                                color: 'red',
                                                fontSize: 15,
                                                marginBottom: 5
                                            }}>{errors.lastName}</div>}
                                            </div>
                                        </div>
                                            
                                        <div style={{padding:5}}></div>
                                    <div className='side-by-side'>
                                        <div>
                                            <div>Email Address* </div>
                                             <TextField
                                                type='email'
                                                placeholder='Email'
                                                style={{width:'355px'}}
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
                                            <div>Role</div>
                                            <Select
                                            name='role'
                                            value={role}
                                            style={{width:'355px'}}
                                            onChange={(event) => {
                                                        setRole(event.target.value);
                                                    }}
                                            >
                                            <MenuItem value=""></MenuItem>
                                            <MenuItem value={'Buyer'}>Buyer</MenuItem>
                                            <MenuItem value={'Seller'}>Seller</MenuItem>
                                            </Select>
                                            </div>
                                    </div>
                                            
                                            <div style={{
                                            display: "flex",
                                            flexDirection: 'column',
                                            marginBottom: 5,
                                            rowGap: 10
                                        }}>
                                        <div>
                                                <h3>Login Information</h3>
                                                <hr/>
                                        </div>
                                        <div className='side-by-side'>
                                                <div>
                                                <div>Password*</div>
                                                <TextField
                                                type='password'
                                                placeholder='Password'
                                                style={{width:'355px'}}
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
                                            <div>
                                                <div>Confirm Password*</div>
                                                <TextField
                                                type='password'
                                                placeholder='Confirm Password'
                                                onChange={handleChange}
                                                style={{width:'355px'}}
                                                name="confirmPd"
                                                onBlur={handleBlur}
                                                 />
                                             {errors.confirmPd && touched.confirmPd && <div style={{
                                                color: 'red',
                                                fontSize: 15,
                                                marginBottom: 5
                                            }}>{errors.confirmPd}</div>}
                                            </div>
                                            </div>
                                        </div>
                                           <div style={{marginBottom:20}}></div>
                                            <Button variant="contained" type="submit" disabled={isSubmitting} >Register</Button>
                                       
                                    </form>

                                );
                            }
                            }
                        </Formik>

                    </div>
                </div>
           

        </>);
}
export default Register;