import React from 'react';
import '../css/header.css';
import '../css/card.css';
import '../css/header.css';
import { Typography, Grid, TextField, FormControl, Select, MenuItem } from '@mui/material';
import { useState, useMemo } from 'react';
import { useEffect } from 'react';
import bookService from '../service/book.service';
import categoryService from '../service/category.service';
import axios from 'axios';


const BookList = () => {
  const [bookRecords, setBookRecords] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });

  }, []);
  useEffect(() => {
    axios.get('https://book-e-sell-node-api.vercel.app/api/book/all').then((res) => {
      if (res.status == 200) {
        console.log(res.data.result);
        setBookRecords(res.data.result);
      }
    })
  }, []);
  return (<>
  <div>
      <div className='center'>
        <div className="loginheader">Product List</div>
        <hr color="red" width='15%' />
      </div>
    </div>
    <div style={{ marginBottom: '45px' }}></div>
    {bookRecords.map((items) => {
      return (
       
        <div className='cards'>
          <div className='card' key={items.id}>
            <img src={items.base64image} alt='myPic' className='cardImg' />
            <div className='card_info'>
              <h3 className='card_title'>{items.name}</h3>
              <span className='card_cat'>{items.category}</span>
              <p className="card-description">{items.description}</p>
              <h5 className="card-price">Rs.{items.price}</h5>
              <button className='cartbtn'>Add to Cart</button>
            </div>
          </div>
        </div>
      
       
        );
    })}
  </>
  );





}
export default BookList;