import React from 'react';
import '../css/header.css';
import '../css/booklist.css'
import { Typography, Grid,TextField,FormControl,Select,MenuItem} from '@mui/material';
import { useState,useMemo } from 'react';
import { useEffect } from 'react';
import bookService from '../service/book.service';
import categoryService from '../service/category.service';

const BookList=()=>{
    const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState();
    const [bookResponse, setBookResponse] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 0,
      });
      const[filters,setFilters]=useState();
      useEffect(() => {
        getAllCategories();
      }, []);
      const books = useMemo(() => {
        const bookList = [...bookResponse.items];
        if (bookList) {
          bookList.forEach((element) => {
            element.category = categories.find(
              (a) => a.id === element.categoryId
            )?.name;
          });
          return bookList;
        }
        return [];
      }, [categories, bookResponse]);
      const searchAllBooks = (filters) => {
        bookService.getAll(filters).then((res) => {
          setBookResponse(filters);
        });
      };
      useEffect(() => {
        searchAllBooks({ ...filters });
      }, [filters]);
      
  const getAllCategories = async () => {
    await categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });
  };
  const sortBooks = (e) => {
    setSortBy(e.target.value);
    const bookList = [...bookResponse.items];

    bookList.sort((a, b) => {
      if (a.name < b.name) {
        return e.target.value === "a-z" ? -1 : 1;
      }
      if (a.name > b.name) {
        return e.target.value === "a-z" ? 1 : -1;
      }
      return 0;
    });
    setBookResponse({ ...bookResponse, items: bookList });
  };

    return(<>
         <div>
          <div className='center'>
            <div className="loginheader">Book List</div>
            <hr color="red" width='15%' />
          </div>
    </div>
    <div style={{marginBottom:'45px'}}></div>
    <Grid container className="grid-title">
          <Grid item xs={6}>
            <Typography variant="h4">
              Total
              <span> - {bookResponse.totalItems} items</span>
            </Typography>
          </Grid>
          <div className="dropdownWrapper">
            <TextField
              id="text"
              className="dropdownWrapper"
              name="text"
              placeholder="Search..."
              variant="outlined"
              inputProps={{ className: "small" }}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  keyword: e.target.value,
                  pageIndex: 1,
                });
              }}
            />
          </div>
          <FormControl>
            <label className='label'>Sort By</label>
            <Select
              onChange={sortBooks}
            >
              <MenuItem value="a-z">a - z</MenuItem>
              <MenuItem value="z-a">z - a</MenuItem>
            </Select>
          </FormControl>
    </Grid>
    <div className="product-list-wrapper">
          <div className="product-list-inner-wrapper">
            {books.map((book, index) => (
              <div className="product-list" key={index}>
                <div className="product-list-inner">
                  <em>
                    <img
                      src={book.base64image}
                      className="image"
                      alt="dummyimage"
                    />
                  </em>
                  <div className="content-wrapper">
                    <Typography variant="h3">{book.name}</Typography>
                    <span className="category">{book.category}</span>
                    <p className="description">{book.description}</p>
                    <p className="price">
                      <span className="discount-price">
                        MRP &#8377; {book.price}
                      </span>
                    </p>
                    <button className="MuiButtonBase-root MuiButton-root MuiButton-contained btn pink-btn MuiButton-containedPrimary MuiButton-disableElevation">
                      <span
                        className="MuiButton-label"
                        // onClick={() => addToCart(book)}
                      >
                        ADD TO CART
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>);
}
export default BookList;