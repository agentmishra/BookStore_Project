import { AppBar } from '@mui/material';
import React, { useMemo, useState } from 'react';
import siteLogo from '../assets/Tatvasoftlogo.svg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartContext } from '../contexts/cartContext';
import SearchIcon from '@mui/icons-material/Search';
import bookService from '../service/book.service';
import UpdateNav from './UpdateNav';
import {List,ListItem} from '@mui/material';
import { toast } from 'react-toastify';
import Shared from '../utils/Shared';
import '../css/header.css';
import { Link} from 'react-router-dom';
import { useAuthContext } from '../contexts/auth';
const Header = () => {
    const authContext=useAuthContext();
    const open = false;
    const cartContext=useCartContext();
    const [query,setquery]=useState("");
    const [bookList,setBookList]=useState([]);
    const [openSearchResult, setOpenSearchResult] = useState(false);

    const LinkStyle = {
        textDecoration: 'none',
        margin: '15px',
        color: '#f14d54'
    }
    const cart = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        textDecoration: 'none',
        border: '1px solid #ccc',
        borderRadius: '4px',
        color: 'black',
        width: '100.48px',
        height: '40px'
    }

    const openMenu = () => {
        document.body.classList.toggle('open-menu');
    }

    const searchBook = async () => {
        const res = await bookService.searchBook(query);
        setBookList(res);
    }
    const search = () => {
        document.body.classList.add("search-results-open");
        searchBook();
        setOpenSearchResult(true);
    }
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
    return (
        <>
            <div style={{ backgroundColor: '#f14d54', height: '12px' }}> </div>
            <div className='headerWrapper' position='static'>
                <div className='headerLogo'>
                    <img src={siteLogo} alt='logo' />
                </div>
                
                    <div className='leftWrapper'>
                    <UpdateNav/>
                   
                    </div>
            </div>
            <div
            className="search-overlay"
             onClick={() => {
             setOpenSearchResult(false);
             document.body.classList.remove("search-results-open");
          }}
        ></div>
            <div className='searchWrapper'>
                <div className='alignWrapper'>
                    <input 
                    type='search' 
                    className='searchBox' 
                    placeholder='what are you looking for...'
                    value={query}
                    onChange={(e) => setquery(e.target.value)} />
                    <button className='btn' type='submit' onClick={search}>
                        <div className='searchIcon'>
                            <SearchIcon />
                            Search
                        </div>
                    </button>
                    <button className='btn cancel' type='submit'>Cancel</button>
                </div>
                <div>
                {openSearchResult && (
                    <>
                      <div className="product-listing">
                        {bookList?.length === 0 && (
                          <p className="no-product">No product found</p>
                        )}
                        <List className="related-product-list">
                          {bookList?.length > 0 &&
                            bookList.map((item, i) => {
                              return (
                                <ListItem key={i}>
                                  <div className="inner-block">
                                    <div className="left-col">
                                      <span className="title">{item.name}</span>
                                      <p>{item.description}</p>
                                    </div>
                                    <div className="right-col">
                                      <span className="price">
                                        {item.price}
                                      </span>
                                      <Link onClick={() => addToCart(item)}>
                                        Add to cart
                                      </Link>
                                    </div>
                                  </div>
                                </ListItem>
                              );
                            })}
                        </List>
                       
                      </div>
                    </>
                  )}

            </div>
            </div>
           
        </>
    );
}

export default Header;
