import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import categoryService from '../service/category.service';
import {TextField, Typography } from "@mui/material";
import { Formik } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import '../css/header.css';
import '../css/myStyle.css';
const EditCategory = () => {
   const Navigate = useNavigate();
   const initialValues={name:""};
   const [initialValueState, setInitialValueState] = useState(initialValues);
   const { id } = useParams();

   const validationSchema = Yup.object().shape({
      name: Yup.string().required("Category Name is required"),
   });

   useEffect(() => {
      if (id) getCategoryById();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
  
   const getCategoryById = () => {
      categoryService.getById(Number(id)).then((res) => {
         console.log(res);
         setInitialValueState({
            id: res.id,
            name: res.name
         });
      });
   };
   const onSubmit = async (values) => {
      console.log(values);
      categoryService
      .save(values)
      .then((res) => {
        toast.success(
          values.id
            ? "Category Updated Successfully"
            : "Category created successfully"
        );
        Navigate("/category");
      })
     
   };
   return (
      <>
         <div className='center'>
         <Typography variant="h3">{id ? "Edit" : "Add"} Category</Typography>
            <hr color="red" width='15%' />
         </div>
         <div style={{ marginBottom: '50px' }}></div>
         <div style={{ margin: 'auto', width: '60%' }}>
            <Formik initialValues={initialValueState} validationSchema={validationSchema} onSubmit={onSubmit}  enableReinitialize={true}>
               {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldError }) => 
                   (
                     <form onSubmit={handleSubmit} >
                        <div className='side-by-side'>
                           <div>
                              <div className='label'>Category Name* </div>
                              <TextField 
                                 type='text'
                                 placeholder="Category Name"
                                 name="name"
                                 style={{ width: '430px' }}
                                 value={values.name}
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                              />
                              {errors.name && touched.name && <div style={{
                                 color: 'red',
                                 fontSize: 15,
                                 marginBottom: 5
                              }}>{errors.name}</div>}
                           </div>
                        </div>
                        <div style={{ padding: 5 }}></div>
                        <div style={{ marginBottom: '35px' }}></div>
                        <button className='savebtn' type='submit'>Save</button>
                        <button
                           className='cancel btn'
                           type='button'
                           onClick={() => Navigate('/category')}>
                           Cancel
                        </button>

                     </form>

                  )
               
               }
            </Formik>
         </div>


      </>
   )
};
export default EditCategory;