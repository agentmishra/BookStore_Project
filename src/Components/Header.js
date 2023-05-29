import { AppBar } from '@mui/material';
import React, { useMemo, useState } from 'react';
import siteLogo from '../assets/Tatvasoftlogo.svg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import '../css/header.css';
import { Link} from 'react-router-dom';



const Header = () => {
    const open = false;
    const [query, setQuery] = useState('');
    const [bookList, setBookList] = useState('');
    const [openSearchResult, setOpenSearchResult] = useState('');

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

    //for menu
    const openMenu = () => {
        document.body.classList.toggle('Open-menu');
    }

    // const searchBook = async () => {
    //     const res = await bookService.searchBook(query);
    //     setBookList(res);
    // }
    // const search = () => {
    //     document.body.classList.add("Search-results-open");
    //     searchBook();
    // }
    return (
        <>
            <div style={{ backgroundColor: '#f14d54', height: '12px' }}> </div>
            <div className='headerWrapper'>
                <div className='headerLogo'>
                    <img src={siteLogo} alt='logo' />
                </div>
                
                    <div className='leftWrapper'>
                        <div >
                            <Link to='/login' style={LinkStyle}>Login</Link>
                            <span className='pipe'></span>
                            <Link to='/register' style={LinkStyle} >Register</Link>
                        </div>
                        <Link to='/cart' style={cart}>
                            <ShoppingCartIcon style={{ color: "#f14d54" }} />
                            <span style={{ color: "#f14d54" }}>0</span>
                            Cart
                        </Link>
                    </div>
            </div>
            <div className='searchWrapper'>
                <div className='alignWrapper'>
                    <input type='search' className='searchBox' placeholder='what are you looking for...' />
                    <button className='btn' type='submit'>
                        <div className='searchIcon'>
                            <SearchIcon />
                            Search
                        </div>
                    </button>
                    <button className='btn cancel' type='submit'>Cancel</button>
                </div>

            </div>
           
        </>
    );
}

export default Header;
