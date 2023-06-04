import React, { useContext } from 'react';
import '../css/header.css';
import '../css/myStyle.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from '@mui/material/Button';
import { FormControl, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Field, Formik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import { toast } from 'react-toastify';
import { loginContext } from '../contexts/LoginContext';
const UpdateProfile=()=>{
    const Navigate = useNavigate('');
    const { user } = useContext(loginContext);
    const api_url='https://book-e-sell-node-api.vercel.app/api/user';
    const initialValues = {
        firstName:'',
        lastName: '',
        email: '',
        newPassword: "",
        confirmPassword: ""
    }
    const [updatePassword, setUpdatePassword] = useState(false);
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(3, "First Name Must be 3 characters long...").max(10).trim('The firstName cannot include leading and trailing spaces').required("Please Enter Your First Name"),
        lastName: Yup.string().min(3, "Last Name must be 3 characters long...").max(10).trim('The lastName cannot include leading and trailing spaces').required('Please Enter Your Last Name'),
        email: Yup.string().email("Please Enter Valid Email").trim('The email cannot include leading and trailing spaces').required('please Enter your Email ID'),
        newPassword: Yup.string().min(8, "Password Must be 8 Characters Long...").matches(/[a-zA-Z]/, 'Password Contains atleast one character').required('Please Enter Your Password'),
        confirmPassword: Yup.string().required('Please Enter Confirm Password').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    
        
    });


    const onFormSubmit = (values, { setSubmitting }) => {
        const requestData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            roleId:values.roleId
        }
        console.log("On Form Submit:", values);
    
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
        alert("Form Submitted Successfully....");
        axios.post(api_url, requestData).then((res) => {
            if (res.status == 200) {
                console.log(res.data.id);
                toast.success('User Registered Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });

            }
        });
        Navigate('/login');
        
    }
    return(<>
         <div>
                    <div className='center'>
                        <h1 className="loginheader">Update Profile</h1>
                        <hr color="red" width='15%' />
                    </div>
        </div>
        <div style={{marginBottom:'15px'}}></div>
        <div style={{
                    width: '60%',
                    margin: 'auto',
                }}>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onFormSubmit}>
                        {({ value, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
                            return (
                                <form onSubmit={handleSubmit} >
                                    <div className='side-by-side'>
                                        <div>
                                            <div className='label'>First Name* </div>
                                            <TextField
                                                type='text'
                                                placeholder="First Name"
                                                name="firstName"
                                                style={{ width: '430px' }}
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
                                            <div className='label'>Last Name* </div>
                                            <TextField
                                                type='text'
                                                placeholder="Last Name"
                                                name="lastName"
                                                style={{ width: '430px' }}
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

                                    <div style={{ padding: 5 }}></div>
                                    <div className='side-by-side'>
                                        <div>
                                            <div className='label'>Email Address* </div>
                                            <TextField
                                                type='email'
                                                placeholder='Email'
                                                style={{ width: '430px' }}
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
                                                <div className='label'>New Password*</div>
                                                <TextField
                                                    type='password'
                                                    placeholder='Enter New Password'
                                                    style={{ width: '430px' }}
                                                    onChange={handleChange}
                                                    name="newPassword"
                                                    onBlur={handleBlur}
                                                />
                                                {errors.newPassword && touched.newPassword && <div style={{
                                                    color: 'red',
                                                    fontSize: 15,
                                                    marginBottom: 5
                                                }}>{errors.newPassword}</div>}
                                            </div>


                                    </div>
                                    <div className='side-by-side'>
                                        <div>
                                        <div>
                                                <div className='label'>Confirm Password*</div>
                                                <TextField
                                                    type='password'
                                                    placeholder='Confirm Password'
                                                    onChange={handleChange}
                                                    style={{ width: '430px' }}
                                                    name="confirmPassword"
                                                    onBlur={handleBlur}
                                                />
                                                {errors.confirmPassword && touched.confirmPassword && <div style={{
                                                    color: 'red',
                                                    fontSize: 15,
                                                    marginBottom: 5
                                                }}>{errors.confirmPassword}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: 20 }}></div>
                                    <Button variant="contained" type="submit" disabled={isSubmitting} className="btn">Update</Button>

                                </form>

                            );
                        }
                        }
                    </Formik>

                </div>
            
    </>);

}
export default UpdateProfile;