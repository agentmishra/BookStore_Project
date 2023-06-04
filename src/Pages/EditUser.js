import React from 'react';
import '../css/header.css';
import { useNavigate } from "react-router-dom";
import { useState, useParams, useEffect } from "react";
import Button from '@mui/material/Button';
import { FormControl, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Formik } from 'formik';

import * as Yup from "yup";
import userService from '../service/user.service';
import axios from "axios";
import { toast } from 'react-toastify';
import '../css/myStyle.css';

const EditUser = () => {
    const Navigate = useNavigate('');
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState();
  


    const initialValues = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        roleId: 0
    }
    const [initialValueState, setInitialValueState] = useState(initialValues);
    const  {id} =useParams();
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(3, "First Name Must be 3 characters long...").max(10).trim('The firstName cannot include leading and trailing spaces').required("Please Enter Your First Name"),
        lastName: Yup.string().min(3, "Last Name must be 3 characters long...").max(10).trim('The lastName cannot include leading and trailing spaces').required('Please Enter Your Last Name'),
        email: Yup.string().email("Please Enter Valid Email").trim('The email cannot include leading and trailing spaces').required('please Enter your Email ID'),
        roleId: Yup.number().required("Role ID is required")
    });
    useEffect(() => {
        userService.getAllRoles().then((res) => {
            if (res) {
              setRoles(res);
            }
          });
      }, []);

      useEffect(() => {
        if (Number(id)) {
            userService.getById(Number(id)).then((res) => {
                if (res) {
                  setUser(res);
                }
              });
        }
      }, [id]);
      useEffect(() => {
        if (user && roles.length) {
          const roleId = roles.find((role) => role.name === user?.role)?.id;
          setInitialValueState({
            id: user.id,
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName,
            roleId,
            password: user.password,
          });
        }
      }, [user, roles]);
    const onFormSubmit = (values) => {
     console.log(values);
    }
    return (
        <>
            <div>
                <div className='center'>
                    <div className="loginheader">Edit User</div>
                    <hr color="red" width='15%' />
                </div>
            </div>
            <div style={{ marginBottom: '45px' }}></div>
            <div style={{ margin: 'auto', width: '60%' }}>
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
                                <div style={{ marginBottom: 40 }}></div>
                                <button className='savebtn' type='submit'>Save</button>
                                <button
                                    className='cancel btn'
                                    type='button'
                                    onClick={()=>{Navigate('/user')}}
                                >
                                    Cancel
                                </button>

                            </form>

                        );
                    }
                    }
                </Formik>
            </div>
        </>


    );

}
export default EditUser;