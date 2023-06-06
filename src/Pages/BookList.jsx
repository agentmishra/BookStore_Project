import React from 'react';
import '../css/header.css';
import '../css/card.css';
import '../css/header.css';
import { Typography, Grid, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useState, useMemo } from 'react';
import { useEffect } from 'react';
import {useAuthContext} from '../contexts/auth';
import {useCartContext} from '../contexts/cartContext';
import Shared from "../utils/Shared";
import bookService from '../service/book.service';
import categoryService from '../service/category.service';
import axios from 'axios';
import { toast } from 'react-toastify';


const BookList = () => {
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  const defaultFilter = {
    pageIndex: 1,
    pageSize: 10,
  };
  const [bookRecords, setBookRecords] = useState([]);
  const [totalItems, setTotalItems] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [sortBy, setSortBy] = useState();
  const [filters, setFilters] = useState(defaultFilter);
  useEffect(() => {
    categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });

  }, []);
  useEffect((filters) => {
    axios.get('https://book-e-sell-node-api.vercel.app/api/book/all',filters).then((res) => {
      if (res.status == 200) {
        console.log(res.data.result);
        setBookRecords(res.data.result);
      }
    })
  }, [filters]);
  const addToCart = (book) => {
    Shared.addtoCart(book, authContext.user.id).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        cartContext.updateCart();
      }
    });
  };
  return (<>
  <div>
      <div className='center'>
        <div className="loginheader">Product List</div>
        <hr color="red" width='15%' />
      </div>
    </div>
    <div style={{ marginBottom: '30px' }}></div>

    <div className='dropDown'>
    <TextField
              id="text"
              className="dropDown"
              name="text"
              placeholder="Search..."
              variant="outlined"
              onChange={(e) => {
                setFilters({
                  ...filters,
                  keyword: e.target.value,
                  pageIndex: 1,
                });
              }}
            />
    </div>
    {/* <FormControl className='DropDown' variant='ourlined'>
    <InputLabel htmlFor='select'>Sort By</InputLabel>
    <Select
              //  onChange={sortBooks}
              // value={sortBy}
            >
              <MenuItem value="a-z">a - z</MenuItem>
              <MenuItem value="z-a">z - a</MenuItem>
            </Select>
          </FormControl> */}

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
              <button className='cartbtn' onClick={()=>addToCart(items)}>Add to Cart</button>
            </div>
          </div>
        </div>
      
       
        );
    })}
  </>
  );





}
export default BookList;