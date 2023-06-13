import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { FormControl, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Formik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import { toast } from 'react-toastify';
import '../css/myStyle.css';
const Register = () => {
    const Navigate = useNavigate('');
    const api_url='https://book-e-sell-node-api.vercel.app/api/user';
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId:0
      
        
    }
    const validationSchema = Yup.object().shape({
        "firstName": Yup.string().min(3, "First Name Must be 3 characters long...").max(10).trim('The firstName cannot include leading and trailing spaces').required("Please Enter Your First Name"),
        "lastName": Yup.string().min(3, "Last Name must be 3 characters long...").max(10).trim('The lastName cannot include leading and trailing spaces').required('Please Enter Your Last Name'),
        "email": Yup.string().email("Please Enter Valid Email").trim('The email cannot include leading and trailing spaces').required('please Enter your Email ID'),
        "password": Yup.string().min(8, "Password Must be 8 Characters Long...").matches(/[a-zA-Z]/, 'Password Contains atleast one character').required('Please Enter Your Password'),
        "confirmPd": Yup.string().required('Please Enter Confirm Password').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    
        
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
    return (
        <>

            <div>
                <div className="center mainHeader">
                    <div className='HomeText'>Home </div>
                    <span style={{ color: '#f14d54' }}>  &gt; Create an Account</span>
                </div>
                <div>
                    <div className='center'>
                        <h1 className="loginheader">Login or Create an Account</h1>
                        <hr color="red" width='15%' />
                    </div>

                </div>
                <div style={{
                    width: '50%',
                    margin: 'auto',
                }}>
                    <h3>Personal Information</h3>
                    <hr />
                    <p className='paraStyle'>Please Enter the following information to create Your Account.</p>
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
                                                style={{ width: '355px' }}
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
                                                style={{ width: '355px' }}
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
                                                style={{ width: '355px' }}
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
                                        <FormControl>
                                            <div className='label'>Role</div>
                                            <Select
                                                name="roleId"
                                                id={"roleId"}
                                                onBlur={handleBlur}
                                                style={{ width: '355px' }}
                                                onChange={handleChange}
                                                
                                            >
                                            <MenuItem value='0'></MenuItem>
                                            <MenuItem value='1'>Buyer</MenuItem>
                                            <MenuItem value='2'>Seller</MenuItem>
                                            </Select>
                                            </FormControl>
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
                                            <hr />
                                        </div>
                                        <div className='side-by-side'>
                                            <div>
                                                <div className='label'>Password*</div>
                                                <TextField
                                                    type='password'
                                                    placeholder='Password'
                                                    style={{ width: '355px' }}
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
                                                <div className='label'>Confirm Password*</div>
                                                <TextField
                                                    type='password'
                                                    placeholder='Confirm Password'
                                                    onChange={handleChange}
                                                    style={{ width: '355px' }}
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
                                    <div style={{ marginBottom: 20 }}></div>
                                    <Button variant="contained" type="submit" disabled={isSubmitting} className="btn">Register</Button>

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