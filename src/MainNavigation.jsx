import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Cart from './Pages/Cart';
import NotFoundPage from './Pages/NotFoundPage';
import ProductPage from './Pages/ProductPage';
import AddBook from './Pages/AddBook';
import BookList from './Pages/BookList';
import User from './Pages/User';
import EditUser from './Pages/EditUser';
import EditBook from './Pages/EditBook';
import globalStyles from './Components/Constants';
import appStyle from './css/AppStyle.module.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';
import { AuthProvider, useAuthContext } from './contexts/auth';
import LoginProvider from './contexts/Loginprovider';
import { AuthContext } from './contexts/auth';
import { useContext } from 'react';
import UpdateProfile from './Pages/UpdateProfile';
import { loginContext } from './contexts/LoginContext';
import loader from '../src/assets/Loader-Icon.gif';
import '../src/css/loader.css';

export const MainNavigation = () => {
  const user = useAuthContext().user
  const Redirect=<Navigate to='/login'/>

    return <Routes>
        <Route exact path='/' element={<HomePage />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={!user.id ? <Register /> : Redirect}></Route>
        <Route exact path='/cart' element={user.id ? <Cart /> : Redirect}></Route>
        <Route exact path='/product' element={user.id ? <ProductPage /> : Redirect}></Route>
        <Route exact path='/add-book' element={user.id ? <AddBook /> : Redirect}></Route>
        <Route exact path='/edit-book' element={user.id ? <EditBook /> : Redirect}></Route>
        <Route exact path='/bookList' element={user.id ? <BookList /> : Redirect}></Route>
        <Route exact path='/user' element={user.id ? <User /> : Redirect}></Route>
        <Route exact path='/edit-user' element={user.id ? <EditUser /> : Redirect}></Route>
        <Route exact path='/update-profile' element={user.id ? <UpdateProfile /> : Redirect}></Route>
        <Route exact path='*' element={user.id ? <NotFoundPage /> : Redirect}></Route>
    </Routes>
}