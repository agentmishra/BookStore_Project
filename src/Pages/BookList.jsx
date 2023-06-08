import React from 'react';
import '../css/header.css';
import '../css/card.css';
import '../css/header.css';
import { Typography, Grid, TextField, FormControl, Select, MenuItem,InputLabel, Pagination } from '@mui/material';
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
  const [bookRecords,setBookRecords]=useState({
    pageIndex:0,
    pageSize:10,
    totalPages:1,
    items:[],
    totalItems:0
  });
  const [sortBy, setSortBy] = useState();
  const [filters,setFilters]=useState(defaultFilter);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });

  }, []);
  const searchAllBooks=(filters)=>{
        bookService.getAll(filters).then((res)=>{
          setBookRecords(res);
        });
  }
  useEffect(() => {
   searchAllBooks({...filters});
   
  }, [filters]);

  const books = useMemo(() => {
    const bookList = [...bookRecords.items];
    if (bookList) {
      bookList.forEach((element) => {
        element.category = categories.find(
          (a) => a.id === element.categoryId
        )?.name;
      });
      return bookList;
    }
    return [];
  }, [categories, bookRecords]);
   
  
  const sortBooks = (e) => {
    setSortBy(e.target.value);
    const bookList=[...bookRecords.items];
    bookList.sort((a, b) => {
      if (a.name < b.name) {
        return e.target.value === "a-z" ? -1 : 1;
      }
      if (a.name > b.name) {
        return e.target.value === "a-z" ? 1 : -1;
      }
      return 0;
    });
    setBookRecords({...bookRecords,items:bookList});
  };
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
    <div style={{ marginBottom: '45px' }}></div>
    <div style={{marginLeft:'160px'}}>
    <Typography variant='h4'>
      Total
      <span> - {bookRecords.totalItems} items</span>
    </Typography>
    </div>
    
    <div className='titleWrapper'>
    <div style={{marginLeft:'550px'}}></div>
    <div className='titleWrapper'>
    <TextField
              id="text"
              style={{width:'450px'}}
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
            <div style={{marginRight:'300px'}}></div>
            <FormControl className="dropdown-wrapper" variant="outlined">
            <InputLabel htmlFor="select">Sort By</InputLabel>
            <Select
            style={{width:'200px'}}
            onChange={sortBooks}
            value={sortBy}
            >
              <MenuItem value="a-z">a - z</MenuItem>
              <MenuItem value="z-a">z - a</MenuItem>
            </Select>
          </FormControl>
          </div>
            </div>
            <div style={{ marginBottom: '15px' }}></div>

     <div style={{margin:'auto',width:'80%'}}>      

    {books.map((items) => {
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
    <div className='paginationWrapper'>
      <Pagination
        count={bookRecords.totalPages}
        page={filters.pageIndex}
        onChange={(e,newPage)=>{
          setFilters({...filters,pageIndex:newPage});
        }}
      />
    </div>
    </div> 
  </>
  );





}
export default BookList;