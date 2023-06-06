import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import bookService from '../service/book.service';
import categoryService from '../service/category.service';
import Button from '@mui/material/Button';
import { FormControl, TextField, Input } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Formik } from 'formik';
import * as Yup from "yup";
import { loginContext } from '../contexts/LoginContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import '../css/header.css';
import '../css/myStyle.css';
const AddBook = () => {

   const initialValues = {
      name: "",
      description: "",
      price: "",
      categoryId: 0,
      base64image: "",
   };
   const Navigate = useNavigate();
   const [initialValueState, setInitialValueState] = useState(initialValues);
   const [categories, setCategories] = useState([]);
   const { id } = useParams();

   const validationSchema = Yup.object().shape({
      name: Yup.string().required("Book Name is required"),
      description: Yup.string().required("Description is required"),
      categoryId: Yup.number()
         .min(1, "Minimum One Category is required")
         .required("Category is required"),
      price: Yup.number().required("Price is required"),
      base64image: Yup.string().required("Image is required"),
   });
   const getBookById = () => {
      bookService.getById(Number(id)).then((res) => {
         setInitialValueState({
            id: res.id,
            name: res.name,
            price: res.price,
            categoryId: res.categoryId,
            description: res.description,
            base64image: res.base64image,
         });
      });
   };
   useEffect(() => {
      if (id) getBookById();
      categoryService.getAll().then((res) => {
         setCategories(res);
      });
   }, [id]);
   const onSubmit = async (values) => {
      console.log(values);
      const getBooks = {
         name: values.name,
         description: values.description,
         price: values.price,
         categoryId: values.categoryId,
         base64image: values.base64image,
      }
      const res = await axios.post('https://book-e-sell-node-api.vercel.app/api/book', getBooks);
      if (res.status === 200) {
         console.log(res.data.id);
         toast.success('Record Inserted Successfully');
      }
      Navigate('/product');
     
   };
   const onSelectFile = (e, setFieldValue, setFieldError) => {
      const files = e.target.files;
      if (files?.length) {
         const fileSelected = e.target.files[0];
         const fileNameArray = fileSelected.name.split(".");
         const extension = fileNameArray.pop();
         if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
            if (fileSelected.size > 10000) {
               toast.error("File size must be less then 10KB");
               return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(fileSelected);
            reader.onload = function () {
               setFieldValue("base64image", reader.result);
            };
            reader.onerror = function (error) {
               throw error;
            };
         } else {
            toast.error("only jpg,jpeg and png files are allowed");
         }
      } else {
         setFieldValue("base64image","");
      }
   }

   return (
      <>
         <div className='center'>
            <div className="loginheader">Add Product</div>
            <hr color="red" width='15%' />
         </div>
         <div style={{ marginBottom: '50px' }}></div>
         <div style={{ margin: 'auto', width: '60%' }}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
               {({ value, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldError }) => {
                  return (
                     <form onSubmit={handleSubmit} >
                        <div className='side-by-side'>
                           <div>
                              <div className='label'>Book Name* </div>
                              <TextField
                                 type='text'
                                 placeholder="Book Name"
                                 name="name"
                                 style={{ width: '430px' }}
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                              />
                              {errors.name && touched.name && <div style={{
                                 color: 'red',
                                 fontSize: 15,
                                 marginBottom: 5
                              }}>{errors.name}</div>}
                           </div>
                           <div >
                              <div className='label'>Book Price* </div>
                              <TextField
                                 type='number'
                                 placeholder="Book Price"
                                 name="price"
                                 style={{ width: '430px' }}
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                              />
                              {errors.price && touched.price && <div style={{
                                 color: 'red',
                                 fontSize: 15,
                                 marginBottom: 5
                              }}>{errors.price}</div>}
                           </div>
                        </div>
                        <div style={{ padding: 5 }}></div>
                        <div className='side-by-side'>
                           <div>
                              <FormControl variant="outlined">
                                 <div className='label'>Shop By Categories*</div>
                                 <Select
                                    name="categoryId"
                                    id="categoryId"
                                    onChange={handleChange}
                                    style={{ width: '430px' }}
                                 >
                                    {categories?.map((props) => (
                                       <MenuItem value={props.id} key={"category" + props.id}>
                                          {props.name}
                                       </MenuItem>
                                    ))}
                                 </Select>
                              </FormControl>
                           </div>
                           <div>
                              <div className='label'>Description*</div>
                              <TextField
                                 type='text'
                                 placeholder="Description"
                                 name="description"
                                 style={{ width: '430px' }}
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                              />
                              {errors.description && touched.description && <div style={{
                                 color: 'red',
                                 fontSize: 15,
                                 marginBottom: 5
                              }}>{errors.description}</div>}
                           </div>
                        </div>

                        <div style={{ marginBottom: '40px' }}></div>
                        <div >
                        
                        
                        <label
                        htmlFor="contained-button-file"
                        className="file-upload-btn"
                      >
                        <input
                          id="contained-button-file"
                          type="file"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            onSelectFile(e, setFieldValue, setFieldError);
                          }}
                        />
                      </label>
                           {errors.base64image && touched.base64image && <div style={{
                              color: 'red',
                              fontSize: 15,
                              marginBottom: 5
                           }}>{errors.base64image}</div>}
                           
                       
                        
                 
                       

                        </div>
                        <div style={{ marginBottom: '35px' }}></div>
                        <button className='savebtn' type='submit'>Save</button>
                        <button
                           className='cancel btn'
                           type='button'
                           onClick={() => Navigate('/product')}>
                           Cancel
                        </button>

                     </form>

                  );
               }
               }
            </Formik>
         </div>


      </>
   )
};
export default AddBook;